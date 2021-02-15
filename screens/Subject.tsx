import * as React from 'react';
import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import { Container } from '../components/Container';
import Browser from "../components/Browser";
import {isLoggedIn} from "../src/Students";
import MeetingLink from "../components/MeetingLink";


export default class Subject extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      item: props.route.params,
      loading: false,
      loadingAddional: false,
    }
  }

  async componentDidMount() {
    const loggedIn = await isLoggedIn();
    this.props.navigation.setOptions({
      headerTitle: this.state.item.time,
    })
    this.setState({loading: false, loggedIn, loadingAddional: loggedIn})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => this.props.navigation.navigate('ListSubjects')

  getDataFromCabinet(data) {
    if (data[this.state.item.time]) {
      this.setState({
        targetData: data[this.state.item.time],
        loading: false,
        loadingAddional: false,
      });
    }
  }

  render() {
    let targetButton = null
    let browser = null
    if (this.state.loggedIn && this.state.item.isToday) {
      if (this.state.targetData) {
        if (this.state.targetData.textInfo) {
          targetButton = (<View><View style={styles.borderAdditionalInfo}/><Text>{this.state.targetData.textInfo}</Text></View>)
        } else if (this.state.targetData.links) {
          const links = this.state.targetData.links
            .map(link => <MeetingLink key={new Date().getTime()} link={link}/>)
          targetButton = <View>
            <View style={styles.borderAdditionalInfo}/>
            <View style={styles.btns}>{links}</View>
          </View>
        }
      } else {
        browser = <Browser uri={'https://cabinet.ztu.edu.ua/site/schedule'} todayCallback={this.getDataFromCabinet.bind(this)}/>
      }
    }

    return (
      <Container loading={this.state.loading}>
        <View style={styles.screenContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.subjectTitle}>{this.state.item.name}</Text>
          </View>
          <View>
            <View style={styles.textFieldContainer}><Text>Час: </Text><Text style={styles.textField}>{this.state.item.time}</Text></View>
            <View style={styles.textFieldContainer}><Text>Викладач:  </Text><Text style={styles.textField}>{this.state.item.teacher}</Text></View>
            <View style={styles.textFieldContainer}><Text>Аудиторія: </Text><Text style={styles.textField}>{this.state.item.room}</Text></View>
            <View style={styles.textFieldContainer}><Text>Тип:  </Text><Text style={styles.textField}>{this.state.item.type}</Text></View>
          </View>
          <View>
            {targetButton}
          </View>
          <View style={styles.browser}>
            {browser}
          </View>
        </View>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 30
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleContainer: {
    marginBottom: 8
  },
  subjectTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold'
  },
  textFieldContainer: {
    display: "flex",
    padding: 3,
    flexDirection: "row"
  },
  textField: {
    fontWeight: "bold"
  },
  browser: {
    width: 0,
    height: 0
  },
  borderAdditionalInfo: {
    marginTop: 30,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  }

});
