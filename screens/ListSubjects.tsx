import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import Scheduler from "../components/Scheduler";

export default class ListSubjects extends React.Component<any, any> {
  render() {
    return (
      <Container loading={false}>
        <Scheduler/>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
