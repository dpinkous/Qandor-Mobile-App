import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ViewHeader } from './common';

export default class Directory extends React.Component<any, any> {
  public static navigationOptions = {
    title: <ViewHeader title="Files" bold/>,
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>View In Progress...</Text>
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
  text: {
		fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 50,
  },
});
