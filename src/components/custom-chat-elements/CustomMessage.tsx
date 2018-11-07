/* eslint no-use-before-define: ["error", { "variables": false }], react-native/no-inline-styles: 0 */
/* eslint-disable no-underscore-dangle, no-use-before-define */

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

const { Day, utils, SystemMessage} = require('react-native-gifted-chat');
const { isSameUser, isSameDay } = utils;

import CustomBubble from './CustomBubble';

interface IProps {
  renderAvatar: Function;
  showUserAvatar: boolean;
  renderBubble: Function;
  renderDay: Function;
  renderSystemMessage: Function;
  position: any;
  currentMessage: any;
  nextMessage: object;
  previousMessage: object;
  user: object;
  inverted: boolean;
  containerStyle: any;
}

export default class Message extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  private getInnerComponentProps = () => {
    const { containerStyle, ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  }

  private renderDay = () => {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  private renderBubble = () => {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <CustomBubble {...bubbleProps} />;
  }

  private renderSystemMessage = () => {
    const systemMessageProps = this.getInnerComponentProps();
    if (this.props.renderSystemMessage) {
      return this.props.renderSystemMessage(systemMessageProps);
    }
    return <SystemMessage {...systemMessageProps} />;
  }

  public render() {
    return (
      <View>
        {this.renderDay()}
        {this.props.currentMessage.system ? (
          this.renderSystemMessage()
        ) : (
          <View
            style={[
              (styles as any)[this.props.position].container,
              {marginBottom: 10},
              !this.props.inverted && { marginBottom: 2 },
              this.props.containerStyle ?
              this.props.containerStyle[this.props.position] : null,
            ]}
          >
            {this.renderBubble()}
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
};
