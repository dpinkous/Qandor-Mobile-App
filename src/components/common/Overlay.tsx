import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const Overlay = (props: any) => {
  if (!props.show) {
    return null;
  }
  return (
    <View style={styles.overlay}/>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9000,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
