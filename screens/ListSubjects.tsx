import * as React from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Container } from '../components/Container';
import {Ionicons} from "@expo/vector-icons";
import {getScheduleByGroup} from "../src/Schedule";
import AsyncStorage from "@react-native-community/async-storage";
import DayList from "../components/DayList";
import Swiper from "react-native-swiper";
import {getWeekNumber} from "../src/Date";


export default class ListSubjects extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.swiperRef = (swiper: any) => this.swiper = swiper

    this.state = {
      loading: false,
      group: props.route.params.group,
      schedule: [],
      days: [],
      subgroups: [],
      isChanged: false,
      currentDay: 1,
      currentWeek: 1,
      firstItem: 0,
    }
  }

  async initGroup() {
    this.props.navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <View><Text style={styles.title}>{this.state.group.name}</Text></View>,
      headerRight: () => <Ionicons onPress={this.goToSettings.bind(this)} style={styles.settings} name="md-settings" size={25} color="black" />
    })
    this.setCurrentDay()
    await this.loadSchedule();
    // @ts-ignore
    let subgroups = JSON.parse(await AsyncStorage.getItem('subgroups'));
    if (!subgroups || subgroups.length === 0) subgroups = await this.selectGroup();
    this.setState({
      days: this.state.schedule.map((day: any, i: number) => {
        if (day.title.endsWith(this.state.currentWeek) && day.index === this.state.currentDay) {
          this.setState({firstItem: i})
        }
        const week = parseInt(day.title.substr(day.title.length - 1, day.title.length));
        return <DayList onClick={this.goToSubjectPage.bind(this)} key={i + new Date().getTime()} subgroups={subgroups} day={day} week={week}/>
      })
    })
  }

  goToSubjectPage(item: any, time: string, day: number, week: number) {
    return this.props.navigation.navigate('Subject', {
      ...item,
      time,
      group: this.state.group,
      isToday: this.isToday(day, week)
    })
  }

  isToday(day: number, week: number) {
    return (day === this.state.currentDay) && (week === this.state.currentWeek)
  }

  async componentDidMount() {
    this.setState({loading: true })
    await this.initGroup()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({loading: false}, () => this.swiper.scrollTo(this.state.firstItem))
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.route.params.needRefresh) {
      nextProps.route.params.needRefresh = false
      return {isChanged: true}
    } else if (prevState.group.name !== nextProps.route.params.group.name) {
      return {isChanged: true, group: nextProps.route.params.group}
    }
    return {isChanged: false}
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    if (this.state.isChanged) {
      this.setState({ loading: true })
      await this.initGroup()
      this.setState({ loading: false }, () => this.swiper.scrollTo(this.state.firstItem))
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  goToSettings() {
    this.props.navigation.navigate('Settings');
  }

  async loadSchedule() {
    let scheduleFromStore = await AsyncStorage.getItem('schedule');
    if (!scheduleFromStore) {
      const schedule = await getScheduleByGroup(this.state.group.name);
      await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
      scheduleFromStore = schedule
    } else {
      scheduleFromStore = JSON.parse(scheduleFromStore)
    }
    this.setState({schedule: scheduleFromStore})
  }

  async selectGroup() {
    const lessons = []
    const {schedule} = this.state
    let found = false;
    for (const day of schedule) {
      for (const property in day) {
        if (day[property] && Array.isArray(day[property]) && ((day[property].length > 1 ) || (day[property][0] && day[property][0].subgroup) || (day[property][1]))) {
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

  setCurrentDay() {
    const currentDate = new Date();
    const weekDay = currentDate.getDay();
    const weekNumberByYear = getWeekNumber(currentDate);
    const weekNumber = weekNumberByYear % 2 == 1 ? 2 : 1 // Replace if change semestr
    this.setState({currentDay: weekDay, currentWeek: weekNumber})
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
    setTimeout(() => this.swiper.scrollTo(this.state.firstItem), 2000)

    return (
      <Container loading={this.state.loading}>
        <Swiper
          ref={this.swiperRef}
          index={0}
          showsButtons={false}
          loop={false}
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
