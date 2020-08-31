import * as React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Header, Title, Content, Icon, Card, CardItem, Text, Body, Left, Right, Footer, } from "native-base";
import Swiper from 'react-native-swiper'
import {View} from "./Themed";

export default class Scheduler extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
      data: [
        {
          key: 'a' + Math.random(),
          title: 'Теорія ймовірностей і математична статистика',
          type: 'Лекція',
          room: '334',
          teacher: 'Давидчук Сергій Петрович'
        }
      ]}
  }

  renderItem({ item, index }: any) {
    console.log(item);
    return (
        <Card key={index}>
          <CardItem key={index} >
            <Text>
              {`${item.title} \n ${item.type} ауд. ${item.room} \n ${item.teacher}`}
            </Text>

          </CardItem>
        </Card>
      )
  }
  render() {
    return (
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: '#000000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        >
          <FlatList data={this.state.data} renderItem={this.renderItem}/>
          <FlatList data={this.state.data} renderItem={this.renderItem}/>
          <FlatList data={this.state.data} renderItem={this.renderItem}/>
          <FlatList data={this.state.data} renderItem={this.renderItem}/>

        </Swiper>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
