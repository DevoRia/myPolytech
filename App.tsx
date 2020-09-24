import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./navigation";
import * as Notifications from 'expo-notifications';
import {Container} from "./components/Container";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {

  state = {
    appIsReady: false,
  };

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        ...Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      });
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async () => {
    setTimeout(() => this.setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    }), 3000)
  };

  render() {
    if (this.state.appIsReady) {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={'dark'} />
          <StatusBar />
        </SafeAreaProvider>
      );
    } else {
      return (<Container loading={true}/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7d089c',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
