import * as React from 'react';
import {Alert, BackHandler, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { Container } from '../components/Container';
import {View, Text} from "../components/Themed";
// @ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';
import ListSubjects from "./ListSubjects";
import {getGroups} from "../src/Group";
import AsyncStorage from "@react-native-community/async-storage";
import {Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants";
import Browser from "../components/Browser";

export default class ChooseGroup extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      serverData: [],
      loading: false,
      selectedItem: null,
    };
  }

  async componentDidMount() {
    this.setState({loading: true})
    this.props.navigation.setOptions({
      headerTitle: Constants.manifest.name,
    })
    const list = await getGroups();
    this.setState({ serverData: list })
    this.setState({loading: false})
  }

  onItemSelect(item: any) {
    this.setState({loading: true})
    this.setState({selectedItem: item})
    this.setState({loading: false})
  }

  async onSubmitItem() {
    this.setState({loading: true})
    await AsyncStorage.setItem('group', JSON.stringify(this.state.selectedItem));
    this.props.navigation.navigate('ListSubjects', {group: this.state.selectedItem});
    this.setState({loading: false})
  }

  render() {
    let submit = null
    if (this.state.selectedItem) {
      submit = (
      <TouchableOpacity
        style={styles.submit}
        onPress={this.onSubmitItem.bind(this)}
      >
        <Ionicons style={styles.submitText} name="md-arrow-forward" size={25} color="white"/>
      </TouchableOpacity>
      )
    }

    return (
      <Container loading={this.state.loading}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Введіть назву своєї групи:
          </Text>
          <SearchableDropdown
            onTextChange={async (text: string) => this.setState({selectedItem: null})}
            onItemSelect={this.onItemSelect.bind(this)}
            containerStyle={{ padding: 5 }}
            textInputStyle={styles.textInputStyle}
            itemStyle={styles.itemStyle}
            itemTextStyle={styles.itemTextStyle}
            itemsContainerStyle={styles.itemsContainerStyle}
            items={this.state.serverData}
            defaultIndex={2}
            placeholder="XX-NN"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
        </View>
        {submit}
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
  navigation: {
    padding: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  textInputStyle: {
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 50,
    color: '#ffffff',
    backgroundColor: '#000000',
  },
  itemsContainerStyle: {
    marginTop: 20,
    maxHeight: '50%',
    marginLeft: '20%',
  },
  itemStyle: {
    textAlign: 'center',
    padding: 10,
    marginTop: 2,
    right: 0,
  },
  itemTextStyle: {
    color: '#000000',
  },
  submit: {
    right: 20,
    bottom: 20,
    position: 'absolute',
    backgroundColor: 'black',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
    paddingTop: 10,
    height: 75,
  },
  submitText: {
    marginTop: 15,
    color: 'white'
  }
});
