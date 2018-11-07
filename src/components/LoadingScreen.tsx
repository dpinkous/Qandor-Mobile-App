import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { LOGO } from './common';

export default class LoadingScreen extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.ImageStyle}
          source={ LOGO }
        />
        <Text style={styles.logoText}>Qandor</Text>
        <Text style={styles.lodingText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 28,
    color: '#2077f4',
    fontFamily: 'Montserrat-Bold',
  },
  lodingText: {
    fontSize: 20,
    color: '#2077f4',
    fontFamily: 'Montserrat-Regular',
  },
})
