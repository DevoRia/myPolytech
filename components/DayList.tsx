import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import { Container, Header, Title, Content, Icon, Card, CardItem, Text, Body, Left, Right, Footer, } from "native-base";

export default class Scheduler extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      day: props.day
    }
  }

  renderItem(item: any, time: string) {
    if (!item) return (<View/>)
    return (
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
        {this.renderItem(this.state.day.firstLesson[0], '8:30-9:50')}
        {this.renderItem(this.state.day.secondLesson[0], '10:00-11:20')}
        {this.renderItem(this.state.day.thirdLesson[0], '11:40-13:00')}
        {this.renderItem(this.state.day.forthLesson[0], '13:30-14:50')}
        {this.renderItem(this.state.day.fifthLesson[0], '15:00-16:20')}
        {this.renderItem(this.state.day.sixthLesson[0], '16:30-17:50')}
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
