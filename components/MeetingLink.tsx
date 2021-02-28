import * as React from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
const zoomIcon = require("../assets/images/zoom.png");
const googleIcon = require("../assets/images/google_meet.png");
const bbbIcon = require("../assets/images/bbb.png");
const moodleIcon = require("../assets/images/moodle.png");
import {Text} from 'react-native'

export default class MeetingLink extends React.Component<any, any> {

  types = {
    google: {
      image: googleIcon,
      text: 'Google Meet'
    },
    zoom: {
      image: zoomIcon,
      text: 'Zoom'
    },
    bluebtn: {
      image: bbbIcon,
      text: 'Big Blue Button'
    },
    learn: {
      text: 'Learn',
      image: moodleIcon
    }
  }

  componentDidMount() {
    let type = ''
    if (this.state.link) {
      if (this.state.link.match(/meet.google.com/g)?.length) {
        type = 'google'
      } else if (this.state.link.match(/zoom.us/g)?.length) {
        type = 'zoom'
      } else if (this.state.link.match(/bigbluebuttonbn/g)?.length || this.state.link.match(/bigbluebutton.ztu.edu.ua/g)?.length) {
        type = 'bluebtn'
      } else if (this.state.link.match(/learn.ztu.edu.ua/g)?.length) {
        type = 'learn'
      }
    }
    this.setState({
      type,
    })
  }

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      link: props.link,
    }
  }

  render() {
    let image = null
    let style = null
    let text = 'Посилання'
    if (this.state.type) {
      if (this.types[this.state.type]) {
        style = this.state.type;
        text = this.types[this.state.type].text
        if (this.types[this.state.type].image) {
          image = <Image style={styles[`image${this.state.type}`]} source={this.types[this.state.type].image}/>;
        }
      }
    }


    return (
      <TouchableOpacity style={[styles.button, styles[style]]} onPress={() => {
        let link = this.state.link
        if (!this.state.link.startsWith('https://') && !this.state.link.startsWith('http://')) link = `https://${link}`
        Linking.openURL(link).catch(err => alert('Проблеми з переходом на: ' + link))}}>
        {image}
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    margin: 10,
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'grey',

  },
  google: {
    backgroundColor: '#123916',
  },
  zoom: {
    backgroundColor: '#116ab5',
  },
  learn: {
    width: 125,
    backgroundColor: '#db6509',
  },
  bluebtn: {
    backgroundColor: '#315ea4',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  imagegoogle: {
    marginLeft: 0,
    margin: 5,
    width: 33,
    height: 27,
  },
  imagezoom: {
    marginLeft: 0,
    margin: 5,
    width: 33,
    height: 27,
  },
  imagebluebtn: {
    marginLeft: 0,
    margin: 4,
    width: 33,
    height: 35,
  },
  imagelearn: {
    marginLeft: 0,
    marginRight: 10,
    margin: 4,
    width: 38,
    height: 33,
  }
});
