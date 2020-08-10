import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
const image = require('../assets/images/favicon.png');
export default class Splash extends React.Component {

    state = {
        progress:  new Animated.Value(100),
        done: false
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            delay: 100
        }).start(() => {
            this.setState({done: true})
        })
    }

    render() {
        const scaleText = {
            transform: [
                {
                    scale: this.state.progress.interpolate({
                        inputRange: [1,20,100],
                        outputRange: [1, 0.6, 16]
                    })
                }
            ]
        }
        return (
            <View
                style={{
                    backgroundColor: '#1a39dc',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Animated.Text
                    style={[scaleText, {
                        fontSize: 60,
                        color: 'white',
                        fontWeight: 'bold'
                    }]}
                >
                    myPolytech
                </Animated.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})