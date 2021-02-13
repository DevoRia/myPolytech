import * as React from 'react';
import {Switch, StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { Container } from '../components/Container';
import {clearGroupData} from "../src/Settings";
import {isLoggedIn, logOut} from "../src/Students";
import Browser from "../components/Browser";


export default class Settings extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      logout: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'Налаштування',
    })
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
          const isLogIn = await isLoggedIn();
          await clearGroupData()
          if (isLogIn) {
            this.setState({
              loading: true,
              logout: true
            })
            await logOut()
          } else {
            this.props.navigation.navigate('WelcomeScreen')
          }
        }
      }, ], {
        cancelable: true
      }
    )
    return true;
  }

  logoutCallback() {
    this.setState({
      loading: false,
      logout: false
    })
    this.props.navigation.navigate('WelcomeScreen')
  }


  render() {
    let browser = null
    if (this.state.logout) {
      browser = <Browser uri={'https://cabinet.ztu.edu.ua'} logoutCallback={this.logoutCallback.bind(this)} logout={this.state.logout}/>
    }

    return (
      <Container loading={this.state.loading}>
        <View style={styles.container}>
          <TouchableOpacity disabled={true} style={styles.mainSection}>
            <Text style={[styles.title, styles.disable]}>Сповіщення</Text>
            <Text style={[styles.description, styles.disable]}>Увімкнення або вимкнення сповіщень. Сповіщення приходять за 5 хвилин до початку пари.</Text>
            <Switch style={styles.switchNotify}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainSection} onPress={this.controlSubgroupsButton.bind(this)}>
            <Text style={styles.title}>Керування підгрупами</Text>
            <Text style={styles.description}>Відображення пар та натходження сповіщень (якщо ті увімкнені) за підгрупами. За замовчуванням вибрана перша підгрупа</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainSection} onPress={this.changeGroupButton.bind(this)}>
            <Text style={styles.title}>Вийти</Text>
            <Text style={styles.description}>Обрати іншу групу</Text>
          </TouchableOpacity>
          <View style={styles.browser}>
            {browser}
          </View>
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
  },
  browser: {
    width: 0,
    height: 0
  },

});
