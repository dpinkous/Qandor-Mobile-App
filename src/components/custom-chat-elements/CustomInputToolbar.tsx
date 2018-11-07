/* eslint no-use-before-define: ["error", { "variables": false }] */

import * as React from 'react';
import { Image, Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const { Composer, Send, Actions } = require('react-native-gifted-chat');

export default class InputToolbar extends React.Component<any, any> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  constructor(props: any) {
    super(props);
  
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  
    this.state = {
      keyboard: 0,
    };
  }

  public componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  public componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  private keyboardDidShow(e: any) {
    this.setState({
      keyboard: e.endCoordinates.height,
    });
  }

  private keyboardDidHide() {
    this.setState({
      keyboard: 0,
    });
  }

  private renderActions = () => {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  private renderSend = () => {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }

  private renderComposer = () => {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  private renderAccessory = () => {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  public render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle, {
          ...Platform.select({
            ios: {
              bottom: this.state.keyboard, 
            },
          })
        }]}
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
          {/* <TouchableOpacity
            style={styles.micContainer}
            // TODO: record audio
            onPress={() => null}
          >
            <Image
              source={require('../../../assets/icons/mic.png')}
              style={styles.micStyle}
            />
          </TouchableOpacity> */}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopWidth: 2,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 50,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
  micContainer: {
    width: 40,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    paddingBottom: 5,
  },
  micStyle: {
    height: 34,
    width: 34,
  },
});
