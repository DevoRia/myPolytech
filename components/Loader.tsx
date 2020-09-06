import * as React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';
import loaderAnimation from '../assets/animations/loader.json'
import { View } from './Themed';

export default class Loader extends React.Component<any, any> {

  componentDidMount() {
  }

  constructor(props: Readonly<any>) {
    super(props);
    this.state = { viewRef: null };
  }

  render() {
    const loaderStyle = [styles.container];

    if (this.props.loading) { // @ts-ignore
      loaderStyle.push(styles.containerVisible);
    }

    // @ts-ignore
    return (
      <View style={loaderStyle} >
        <BlurView intensity={100} style={[StyleSheet.absoluteFill]}>
          <LottieView
            source={loaderAnimation}
            autoPlay={true}
            loop={true}
          />
        </BlurView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(231,231,231,0.9)',
    opacity: 0,
    zIndex: -10,
  },
  containerVisible: {
    opacity: 1,
    zIndex: 100,
  },
  blurredView: {
    // For me android blur did not work until applying a background color:
    backgroundColor: 'white',
  },
});
