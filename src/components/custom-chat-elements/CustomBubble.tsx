/* eslint-disable no-underscore-dangle, no-use-before-define */
/* eslint no-use-before-define: ["error", { "variables": false }] */

import * as React from 'react';

const { Text, Platform, Clipboard, StyleSheet, TouchableWithoutFeedback, View } = require('react-native');
const { MessageText, MessageImage, Time } = require('react-native-gifted-chat');

export default class Bubble extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
    }
  
  private onLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage);
    } else if (this.props.currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: number) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(this.props.currentMessage.text);
              break;
            default:
              break;
          }
        },
      );
    }
  }

  private renderMessageText = () => {
    if (this.props.currentMessage.text) {
      const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  private renderMessageImage = () => {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps} />;
    }
    return null;
  }

  private renderTicks = () => {
    const { currentMessage } = this.props;
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return null;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={styles.tickView}>
          {currentMessage.sent && <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>}
          {currentMessage.received && <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>}
        </View>
      );
    }
    return null;
  }

  private renderTime = () => {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return <Time {...timeProps} />;
    }
    return null;
  }

  private renderCustomView = () => {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  public render() {
    return (
      <View
        style={[
          (styles as any)[this.props.position].container,
          this.props.containerStyle ?
          this.props.containerStyle[this.props.position] : null,
        ]}
      >
        <View
          style={[
            (styles as any)[this.props.position].wrapper,
            {zIndex: 9000},
            this.props.wrapperStyle ?
            this.props.wrapperStyle[this.props.position]: null,
          ]}
        >
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits="text"
            {...this.props.touchableProps}
          >
            <View>
              {this.renderCustomView()}
              {this.renderMessageImage()}
              {this.renderMessageText()}
              <View style={[
                styles.bottom,
                this.props.bottomContainerStyle ? this.props.bottomContainerStyle[this.props.position] : null
              ]}>
                {this.renderTime()}
                {this.renderTicks()}
                {
                  Platform.OS === 'ios' ?
                  <View style={[
                    styles.wrapperTail,
                    (styles as any)[this.props.position].wrapperTail,
                  ]}>
                    <View style={[
                      styles.wrapperTailSquer,
                      (styles as any)[this.props.position].wrapperTailSquer
                    ]}></View>
                  </View> : null
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* {
          Platform.OS === 'android' ?
          <View style={[
            styles.wrapperTail,
            (styles as any)[this.props.position].wrapperTail,
          ]}>
            <View style={[
              styles.wrapperTailSquer,
              (styles as any)[this.props.position].wrapperTailSquer
            ]}></View>
          </View>: null
        } */}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 5,
      backgroundColor: '#fff',
      marginRight: 60,
      marginLeft: 20,
      minHeight: 20,
      justifyContent: 'flex-end',
      ...Platform.select({
        ios: {
          borderBottomLeftRadius: 0,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
        android: {
          zIndex: 9000
        }
      })
    },
    wrapperTail: {
      backgroundColor: '#fff',
      // backgroundColor: '#000',
      // zIndex: 9001,
      ...Platform.select({
        ios: {
          left: -12,
        },
        android: {
          left: 8,
        }
      })
    },
    wrapperTailSquer: {
      borderBottomRightRadius: 12,
      left: 0,
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 5,
      backgroundColor: '#2077f4',
      marginLeft: 60,
      marginRight: 20,
      minHeight: 20,
      justifyContent: 'flex-end',
      ...Platform.select({
        ios: {
          borderBottomRightRadius: 0,
        },
      })
    },
    wrapperTail: {
      backgroundColor: '#2077f4',
      ...Platform.select({
        ios: {
          right: -12,
        },
        android: {
          right: 9,
        },
      })
    },
    wrapperTailSquer: {
      borderBottomLeftRadius: 12,
      ...Platform.select({
        ios: {
          right: -2,
        },
        android: {
          right: -3,
        },
      })
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
  }),
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tick: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: '#fff',
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  wrapperTail: {
    width: 14,
    height: 14,
    bottom: 0,
    position: 'absolute',
    zIndex: 9000,
    elevation: 100,
  },
  wrapperTailSquer: {
    width: 12,
    height: 14,
    top: 0,
    backgroundColor: '#efefef',
  },
};
