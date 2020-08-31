import * as React from 'react';
import {StyleSheet} from 'react-native';

import { View } from './Themed';
import Loader from './Loader';

export const Container = ({children, loading}: any) => {

  if (loading) {
    return <Loader style={styles.indicator}/>
  }

  return (
    <View style={styles.container}>
      {children}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  indicator: {
  }
});
