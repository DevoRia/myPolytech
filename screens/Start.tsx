import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Container } from '../components/Container';
import ListSubjects from "./ListSubjects";
import AsyncStorage from "@react-native-community/async-storage";

export default class ChooseGroup extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    this.setState({loading: true})
    const group = await AsyncStorage.getItem('group');
    if (group) {
      this.props.navigation.navigate('ListSubjects', {group: JSON.parse(group)});
    } else {
      this.props.navigation.navigate('TabScreen');
    }
    this.setState({loading: false})
  }


  render() {
    return (
      <Container loading={this.state.loading}>
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
});
