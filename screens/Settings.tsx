import * as React from 'react';
import {Switch, SectionList, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { Container } from '../components/Container';
import {Ionicons} from "@expo/vector-icons";
import {clearGroupData} from "../src/Settings";


export default class Settings extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'Налаштування',
    })
  }

  switchNotificationsButton = () => {
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
        cancelable: false
      }
    )
    return true;
  }


  controlSubgroupsButton = () => this.props.navigation.navigate('SettingsSubgroups')

  changeGroupButton = () => {
    Alert.alert(
      'Впевнені?',
      'Ну всяке буває, раптом випадково.', [{
        text: 'Ні',
        onPress: () => {},
        style: 'cancel'
      }, {
        text: 'Так',
        onPress: async () => {
          await clearGroupData()
          this.props.navigation.navigate('TabScreen')
        }
      }, ], {
        cancelable: true
      }
    )
    return true;
  }




  render() {
    return (
      <Container loading={this.state.loading}>
        <View style={styles.container}>
          <TouchableOpacity disabled={true} style={styles.mainSection} onPress={this.switchNotificationsButton.bind(this)}>
            <Text style={[styles.title, styles.disable]}>Сповіщення</Text>
            <Text style={[styles.description, styles.disable]}>Увімкнення або вимкнення сповіщень. Сповіщення приходять за 5 хвилин до початку пари.</Text>
            <Switch style={styles.switchNotify}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainSection} onPress={this.controlSubgroupsButton.bind(this)}>
            <Text style={styles.title}>Керування підгрупами</Text>
            <Text style={styles.description}>Відображення пар та натходження сповіщень (якщо ті увімкнені) за підгрупами. За замовчуванням вибрана перша підгрупа</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainSection} onPress={this.changeGroupButton.bind(this)}>
            <Text style={styles.title}>Змінити групу</Text>
            <Text style={styles.description}>Обрати іншу групу</Text>
          </TouchableOpacity>
      </View>
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
  disable: {
    color: 'grey'
  },
  switchNotify: {
    right: 20,
    top: 50,
    position: "absolute",
  }

});
