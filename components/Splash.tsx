import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Svg, Path, Rect } from 'react-native-svg';
import Animated, { Easing }  from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export default class Splash extends React.Component {

  state = {
    progress: new Animated.Value(100),
    bgProg: new Animated.Value(0),
    done: false
  }

  componentDidMount() {
    this.initTitleAnimation()
    this.initLayersAnimation()
  }

  initTitleAnimation() {
    Animated.timing(this.state.progress, {
      toValue: 0,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      this.setState({done: true})
    })
  }

  initLayersAnimation() {
    Animated.timing(this.state.bgProg, {
      easing: Easing.inOut(Easing.ease),
      toValue: 1000,
      duration: 3
    }).start( () => {})
  }

  scaleText = {
    transform: [
      {
        scale: this.state.progress.interpolate({
          inputRange: [1,20,100],
          outputRange: [1, 2, 30]
        })
      }
    ]
  }

  anim = Animated.interpolate(this.state.progress, {
    inputRange: [-1, 0],
    outputRange: [10, 20],
  });

  render() {
    const pathColor = Animated.concat('rgb(', 0, ',', 0, ',', 0, ')');
    return (
      <Animated.View style={{...styles.container, ...{ backgroundColor: pathColor } }}>
        <Animated.Text style={[this.scaleText, styles.title]}>
          {Constants.manifest.name}
        </Animated.Text>
        <Svg style={{position: 'absolute', zIndex: -3}} width="100%" height="100%" viewBox="10 15 50 50">
          <AnimatedRect width="100" height="110" fill={pathColor} />
        </Svg>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold'
  }
})
