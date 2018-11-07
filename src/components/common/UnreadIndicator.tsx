import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../TabBarNavigation';

export const UnreadIndicator = (props: any) => {
  if (!props.unread) {
    return null;
  }
  return (
    <View style={[styles.unreadContainerStyle, {backgroundColor: COLORS.GREEN}]}>
      <Text style={[styles.unreadText, {color: COLORS.WHITE}]}>{props.unread}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  unreadContainerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    width: 14,
    height: 14,
  },
  unreadText: {
    fontSize: 9,
    textAlign: 'center',
  },
});
