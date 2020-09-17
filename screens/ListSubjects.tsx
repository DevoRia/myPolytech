import * as React from 'react';
import {Alert, BackHandler, TouchableHighlight, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import { Container } from '../components/Container';
import {Ionicons} from "@expo/vector-icons";
import {getScheduleByGroup} from "../src/Schedule";
import AsyncStorage from "@react-native-community/async-storage";
import DayList from "../components/DayList";
import Swiper from "react-native-swiper";


export default class ListSubjects extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      group: props.route.params.group,
      schedule: [],
      days: [],
      subgroups: [],
      isChanged: false,
    }
  }

  async initGroup() {
    this.props.navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <View><Text style={styles.title}>{this.state.group.name}</Text></View>,
      headerRight: () => <Ionicons onPress={this.goToSettings.bind(this)} style={styles.settings} name="md-settings" size={25} color="black" />
    })
    await this.loadSchedule();
    // @ts-ignore
    let subgroups = JSON.parse(await AsyncStorage.getItem('subgroups'));
    if (!subgroups || subgroups.length === 0) subgroups = await this.selectGroup();
    this.setState({
      days: this.state.schedule.map((day: any) => <DayList key={`${day.title}${new Date()}`} subgroups={subgroups} day={day}/>)
    })

  }

  async componentDidMount() {
    this.setState({loading: true })
    await this.initGroup()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({loading: false})
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.route.params.needRefresh) {
      nextProps.route.params.needRefresh = false
      return {isChanged: true}
    } else if (!prevState.group.name === nextProps.route.params.group.name) {
      return {isChanged: true, group: nextProps.route.params.group}
    }
    return {isChanged: false}
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    if (this.state.isChanged) {
      this.setState({ loading: true })
      await this.initGroup()
      this.setState({ loading: false })
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  goToSettings() {
    this.props.navigation.navigate('Settings');
  }

  async loadSchedule() {
    const {schedule} = await getScheduleByGroup(this.state.group.name);
    this.setState({schedule})
  }

  async selectGroup() {
    const lessons = []
    const {schedule} = this.state
    let found = false;
    for (const day of schedule) {
      for (const property in day) {
        if (day[property] && Array.isArray(day[property]) && ((day[property].length > 1 ) || (day[property][0] && day[property][0].subgroup) || (day[property][1]))) {
          console.log(day[property].length, 'here', property);
          if (!found) {
            alert('У вашій групі виявлено підгрупи. За замовчуванням відображається перша підгрупа, відредагувати їх можна в налаштуваннях.')
            found = true
          }
          for (const lesson of day[property]) {
            lessons.push(lesson.name)
          }
        }
      }
    }

    const subgroups = Array.from(new Set(lessons)).map((lesson: string) => ({name: lesson, subgroup: 1}));
    await AsyncStorage.setItem('subgroups', JSON.stringify(subgroups))
    return subgroups;
  }

  handleBackButton = () => {
    Alert.alert(
      'Закрити myPolytech?',
      'Бажаєте закрити додаток?', [{
        text: 'Ні',
        onPress: () => {},
        style: 'cancel'
    }, {
      text: 'Так',
        onPress: () => BackHandler.exitApp()
    }, ], {
      cancelable: true
    }
    )
      return true;
  }

  render() {
    const {days} = this.state

    return (
      <Container loading={this.state.loading}>
        <Swiper
          showsButtons={false}
          dot={<View/>}
          activeDot={<View/>}
        >
          {days}
        </Swiper>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  settings: {
    right: 20,
  },
  title: {
    padding: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
});
