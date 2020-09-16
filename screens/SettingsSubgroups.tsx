import * as React from 'react';
import {Switch, SectionList, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { Container } from '../components/Container';
import {Ionicons} from "@expo/vector-icons";


export default class SettingsSubgroups extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'Налаштування підгруп',
    })
  }

  render() {
    return (
      <Container loading={this.state.loading}>

      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSection: {
    paddingLeft: 30,
  },
  description: {
    right: 0,
    maxWidth: 250,
  },
  title: {
    paddingTop: 35,
    paddingBottom: 3,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  switchNotify: {
    right: 20,
    top: 50,
    position: "absolute",
  }

});
