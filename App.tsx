import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Splash from "./components/Splash";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./navigation";

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
      return <Splash/>
    }

    return (
      <SafeAreaProvider>
        <Navigation colorScheme={'dark'} />
        <StatusBar />
      </SafeAreaProvider>
    );
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
