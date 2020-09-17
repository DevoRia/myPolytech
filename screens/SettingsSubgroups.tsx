import * as React from 'react';
import {
  Switch,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import { Container } from '../components/Container';
import AsyncStorage from "@react-native-community/async-storage";
import {Ionicons} from "@expo/vector-icons";


export default class SettingsSubgroups extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      subgroups: [],
      subgroupsRaw: '',
      changed: false,
      loading: false,
    }
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    if (this.state.changed) {
      this.props.navigation.setOptions({
        headerRight: () => <Ionicons onPress={this.applyChanges.bind(this)} style={styles.submit} name="md-checkmark" size={25} color="black" />
      })
    } else {
      this.props.navigation.setOptions({
        headerRight: () => <View/>
      })
    }

  }
  async componentDidMount() {
    this.setState({loading: true})

    this.props.navigation.setOptions({
      headerTitle: 'Налаштування підгруп',
    })
    const subgroupsRaw = await AsyncStorage.getItem('subgroups');
    // @ts-ignore
    const subgroups = JSON.parse(subgroupsRaw);
    if (!subgroups || subgroups.length === 0) {
      alert('У вас немає підгруп!')
      this.props.navigation.goBack()
    }
    this.setState({subgroups, subgroupsRaw})
    this.setState({loading: false})
  }

  changeSubgroup(subject: any, index: number, subgroup: number) {
    const {subgroups} = this.state
    subgroups[index].subgroup = subgroup
    const changed = JSON.stringify(subgroups) !== this.state.subgroupsRaw
    this.setState({changed})
  }

  async applyChanges() {
    this.setState({loading: true});
    await AsyncStorage.setItem('subgroups', JSON.stringify(this.state.subgroups));
    this.props.navigation.navigate('ListSubjects', {needRefresh: true});
    this.setState({loading: false});
  }

  renderListOfSubgroups() {
    const {subgroups} = this.state
    if (subgroups.length > 0) {
      const subgroupTemplates = subgroups.map((subject: any, i: number) => {
        const firstState = subject.subgroup === 1 ? styles.activeSubgroup : styles.subgroup
        const secondState = subject.subgroup === 2 ? styles.activeSubgroup : styles.subgroup
        const firstStateText = subject.subgroup === 1 ? styles.activeInfo : styles.info
        const secondStateText = subject.subgroup === 2 ? styles.activeInfo : styles.info
        return (
          <View style={styles.mainSection} key={subject.name}>
            <View style={styles.titleSide}><Text style={styles.title}>{subject.name}</Text></View>
            <View style={styles.subgroups}>
              <TouchableOpacity onPress={this.changeSubgroup.bind(this, subject, i,1)} style={firstState}><Text style={firstStateText}>1</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.changeSubgroup.bind(this, subject, i, 2)} style={secondState}><Text style={secondStateText}>2</Text></TouchableOpacity>
            </View>
          </View>
        )
      });
      return (<View style={styles.container}>{subgroupTemplates}</View>)
    }
    return (<View/>)
  }

  render() {
    return (
      <Container loading={this.state.loading}>
        {this.renderListOfSubgroups()}
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  submit: {
    right: 20,
  },
  container: {
    flex: 1,
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 30,
  },
  titleSide: {
    paddingTop: 35,
  },
  title: {
    fontSize: 15,
    maxWidth: 160,
    fontWeight: 'bold',
    color: 'black'
  },
  subgroups: {
    flexDirection: 'row',
    right: 30,
    paddingTop: 35,
    paddingRight: 0
  },
  subgroup: {
    paddingLeft: 11,
    paddingTop: 5,
    marginRight: 5,
    borderRadius: 20,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#20232a",
    color: 'white'
  },
  activeSubgroup: {
    paddingLeft: 11,
    paddingTop: 5,
    marginRight: 5,
    borderRadius: 20,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    color: 'white'
  },
  info: {
    color: 'black'
  },
  activeInfo: {
    color: 'white'
  }
});
