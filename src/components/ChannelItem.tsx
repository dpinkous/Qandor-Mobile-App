import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { connect } = require('react-redux');

import { renderNames, getTime } from './Utils';
import { getMessages, readNew, getSearchedChannelMessages } from '../actions';
import { API_URL } from '../App';
import { IAppState } from '../reducers';

const Screen = Dimensions.get('window');

@connect(
  (state: IAppState) => {
    const { userID } = state.auth;
    return { userID };
  }, { getMessages, readNew, getSearchedChannelMessages },
)
export default class ConversationItem extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      enable: true,
    };
  }

  private handlePress = (name: string) => {
    const { data, search } = this.props;
    if (!search) {
      if (this.state.enable) {
        this.setState({enable: false});
        this.props.getMessages(data.id, name);
        if (data.new) {
          this.props.readNew(data.id);
        }
        setTimeout(() => {
          this.setState({enable: true});
        }, 1000);
      }
    }
    else {
      const { id, messageID } = data;
      this.props.getSearchedChannelMessages(id, messageID);
      this.props.searchReset();
    }
  }

  public render() {
    const { data, userID, search } = this.props;
    let { users } = data;
    if (!search) {
      users = users.filter((user: any) => user.id !== parseInt(userID));
    }
    const conversationName = renderNames(users);
    return (
      <TouchableOpacity onPress={() => this.handlePress(conversationName)}>
        <View style={styles.conversationItemStyle}>
            {
              users.length > 1 ?
                <View style={styles.imageContainerStyle}>
                  <Image
                    style={styles.imageMiniFirstStyle}
                    source={{ uri: users[0].image ? `${ API_URL.slice(0, -4) }${ users[0].image }` : "" }}
                  />
                  <Image
                    style={styles.imageMiniSecondStyle}
                    source={{ uri: users[1].image ? `${ API_URL.slice(0, -4) }${ users[1].image }` : "" }}
                  /> 
                </View>
                :
                <View style={styles.imageContainerStyle}>
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: users[0].image ? `${ API_URL.slice(0, -4) }${ users[0].image }` : "" }}
                  />
                </View>
            }
          <View style={styles.conversationInfoStyle}>
            <View style={styles.conversationHeaderStyle}>
              <Text style={styles.participantsNamesStyle} numberOfLines={ 1 } ellipsizeMode="tail">{conversationName}</Text>
              <Text style={styles.timestampStyle}>{data.last_message_time ? getTime(data.last_message_time) : ""}</Text>
            </View>
            <View style={styles.lastConversationBody}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[{color: '#787878'}, data.new ? {fontWeight: 'bold'} : null]}
              >{data.last_message_text ? data.last_message_text : ""}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  conversationItemStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    height: 100,
  },
  imageContainerStyle: {
    margin: 15,
    marginLeft: 0,
    width: 70,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  imageMiniFirstStyle: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  imageMiniSecondStyle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  conversationInfoStyle: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 0.4,
    borderBottomColor: '#888',
  },
  participantsNamesStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: Screen.width - 200,
  },
  timestampStyle: {
    fontSize: 16,
    color: '#787878',
    width: 70,
  },
  conversationHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    marginTop: 20,
  },
  lastConversationBody: {
    flex: 1,
  },
});
