import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ICONS } from '.';

export const ArrowBack = (props: any) => (
  <View style={ styles.wrapper }>
    <Image
      source={ ICONS.arrow }
      style={[styles.backIconStyle, props.style]}
    />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconStyle: {
    width: 15,
    height: 20,
  },
});
