import * as React from 'react';
import {StyleSheet} from 'react-native';
import Browser from "../components/Browser";
import AsyncStorage from "@react-native-community/async-storage";
import {logIn} from "../src/Students";
import {Container} from "../components/Container";
import {getGroupByName} from "../src/Group";


export default class Login extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'Login',
    })
  }

  async onSubmitItem(data) {
    this.setState({loading: true})
    await logIn()
    const group = await getGroupByName(data.group);
    await AsyncStorage.removeItem('schedule')
    await AsyncStorage.setItem('group', JSON.stringify(group));
    this.props.navigation.navigate('ListSubjects', {group});
    this.setState({loading: false})
  }

  setLoading(state) {
    this.setState({loading: state})
  }


  render() {
    return (
      <Container loading={this.state.loading}>
        <Browser loading={this.setLoading.bind(this)} loginCallback={this.onSubmitItem.bind(this)} login={true}/>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
