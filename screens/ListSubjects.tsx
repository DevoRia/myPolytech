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
      days: [],
    }
  }

  async initGroup() {
    console.log(this.state.group.name);
    this.props.navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <View><Text style={styles.title}>{this.state.group.name}</Text></View>,
      headerRight: () => <Ionicons onPress={this.goToSettings.bind(this)} style={styles.settings} name="md-settings" size={25} color="black" />
    })
    await this.loadSchedule();
  }

  async componentDidMount() {
    this.setState({loading: true })
    await this.initGroup()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({loading: false})
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return prevState.group.name === nextProps.route.params.group.name ?
      {isChanged: false} : {isChanged: true, group: nextProps.route.params.group}
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    if (this.state.isChanged) {
      this.setState({loading: true })
      await this.initGroup()
      this.setState({loading: false})
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
    this.setState({
      days: schedule.map((day: any) => <DayList key={day.title} day={day}/>)
    })
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
