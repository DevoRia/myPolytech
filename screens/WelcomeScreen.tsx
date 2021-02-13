import * as React from 'react';
import {Alert, BackHandler, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Container } from '../components/Container';
import {View, Text} from "../components/Themed";
import Constants from "expo-constants";
const icon = require("../assets/images/icon.png");

export default class WelcomeScreen extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      serverData: [],
      loading: false,
      selectedItem: null,
    };
  }

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <View><Text style={styles.navigation}>{Constants.manifest.name}</Text></View>,
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

    return (
      <Container loading={this.state.loading}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={icon}/>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.loginTitle}>Увійти за допомогою</Text>
            <Text style={styles.loginTitle}>cabinet.ztu.edu.ua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TabScreen')}
          >
            <Text style={styles.loginlessTitle}>Користуватися без входу</Text>
          </TouchableOpacity>

        </View>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 50
  },
  icon: {
    width: 150,
    height: 150,
  },
  navigation: {
    padding: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 40,
    marginBottom: 10
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  loginlessTitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 1,
  }
});
