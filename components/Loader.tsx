import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

import loaderAnimation from '../assets/animations/spinner.json'
import { View } from './Themed';

export default class Loader extends React.Component<any, any> {

  componentDidMount() {
  }

  constructor(props: Readonly<any>) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={loaderAnimation}
          autoPlay={true}
          loop={true}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#22586f',
  },
});
