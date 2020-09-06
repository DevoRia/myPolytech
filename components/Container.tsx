import * as React from 'react';
import {StyleSheet} from 'react-native';

import { View } from './Themed';
import Loader from './Loader';

export const Container = ({children, loading}: any) => {

  return (
    <View style={styles.container}>
      {children}
      <Loader loading={loading}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
});
