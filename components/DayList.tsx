import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Card, CardItem, Text } from "native-base";
import {setCurrentDayNotifications} from "../src/Notification";

export default class Scheduler extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      day: props.day,
      week: props.week,
      group: props.group,
      subgroups: props.subgroups,
      onClick: props.onClick,
      isTodayFn: props.isTodayFn,
    }
  }

  renderItem(item: any, time: string) {
    if (!item) return (<View/>)

    item = Object.values(item)

    if (item.length === 1 && !(item[0].subgroup)) return this.simpleCard(item[0], time)
    for (let i = 0; i < item.length; i++) {
      if (item[i]) {
        const find = this.state.subgroups.find((subject: any) => subject.name === item[i].name);
        if (find.subgroup === item[i].subgroup) return this.simpleCard(item[i], time)
      }
    }
  }

  simpleCard(item: any, time: string) {
    if (!item) return (<View/>)
    const isToday = this.state.isTodayFn(this.state.day.index, this.state.week);

    const itemData = {
      ...item,
      isToday,
      time,
      group: this.state.group
    }

    if (isToday){
      setCurrentDayNotifications(itemData)
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.state.onClick(itemData)} >
        <Card style={styles.card}>
          <CardItem style={styles.cardItem}>
            <Text style={styles.time}>{time}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.info}>{`${item.type} ауд. ${item.room}`}</Text>
              <Text style={styles.info}>{item.teacher}</Text>
            </View>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>

    )
  }

  prepareDayTitle(title: string) {
    if (title.endsWith('1')) {
      return title.replace('1', '(Перший тиждень)')
    }
    return title.replace('2', '(Другий тиждень)')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.dayTitlePosition}>
          <Text style={styles.dayTitle}>{this.prepareDayTitle(this.state.day.title)}</Text>
        </View>
        <ScrollView>
          {this.renderItem(this.state.day.firstLesson, '8:30-9:50')}
          {this.renderItem(this.state.day.secondLesson, '10:00-11:20')}
          {this.renderItem(this.state.day.thirdLesson, '11:40-13:00')}
          {this.renderItem(this.state.day.forthLesson, '13:30-14:50')}
          {this.renderItem(this.state.day.fifthLesson, '15:00-16:20')}
          {this.renderItem(this.state.day.sixthLesson, '16:30-17:50')}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  emptyLesson: {

  },
  card: {
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
    shadowOpacity: 0,
    elevation: 0.5,
  },
  cardItem: {
    borderRadius: 20,
    padding: 30,
  },
  time: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingLeft: 12,
    paddingTop: 5,
    paddingRight: 12,
    backgroundColor: 'black',
    borderRadius: 20,
    height: 30,
    color: 'white'
  },
  dayTitlePosition: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 25,
    marginLeft: 15,
  },
  dayTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold'
  },
  title: {
    color: '#000000',
    fontSize: 15,
    maxWidth: 175,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  info: {
    maxWidth: 180,
    paddingTop: 10,
  }
});
