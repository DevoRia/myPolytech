import * as React from 'react';
import {Switch, SectionList, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { Container } from '../components/Container';
import {Ionicons} from "@expo/vector-icons";
import {clearGroupData} from "../src/Settings";


export default class Subject extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      item: props.route.params,
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: this.state.item.time,
    })
  }

  render() {
    return (
      <Container loading={this.state.loading}>
        <View style={styles.screenContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.subjectTitle}>{this.state.item.name}</Text>
          </View>
          <View>
            <View style={styles.textFieldContainer}><Text>Час: </Text><Text style={styles.textField}>{this.state.item.time}</Text></View>
            <View style={styles.textFieldContainer}><Text>Викладач:  </Text><Text style={styles.textField}>{this.state.item.teacher}</Text></View>
            <View style={styles.textFieldContainer}><Text>Аудиторія: </Text><Text style={styles.textField}>{this.state.item.room}</Text></View>
            <View style={styles.textFieldContainer}><Text>Тип:  </Text><Text style={styles.textField}>{this.state.item.type}</Text></View>
          </View>
        </View>

      </Container>
    );
  }

}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 30
  },
  titleContainer: {
    marginBottom: 8
  },
  subjectTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold'
  },
  textFieldContainer: {
    display: "flex",
    padding: 3,
    flexDirection: "row"
  },
  textField: {
    fontWeight: "bold"
  }

});
