import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IAppState } from '../reducers';

const ReactElements = require('react-native-elements');
const ImagePicker = require('react-native-image-picker');
const uuidv4 = require('uuid/v4');
const { connect } = require('react-redux');
const { GiftedChat } = require('react-native-gifted-chat');

import Details from './Details';
import CustomMessage from './custom-chat-elements/CustomMessage';
import CustomInputToolbar from './custom-chat-elements/CustomInputToolbar';
import { clearChat, sendMessage, getNewMessages } from '../actions';
import { ArrowBack, Overlay, ViewHeader } from './common';
import { renderNames } from './Utils';

@connect(
  (state: IAppState) => {
    const { chat, auth } = state;
    return { chat, auth }
  }, { clearChat, sendMessage, getNewMessages },
)
export default class Chat extends React.Component<any, any> {
  interval: any;
  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;
    return({
      title:
        <ViewHeader
          title={
            params && params.title ? params.title : 'Chat'
          }
          bold={params && params.title === 'Details'}
        />,
      headerTitleStyle: {
        alignSelf: 'center',
        color: '#fff',
      },
      headerLeft:
        <TouchableOpacity onPress={() => {
          if (params && params.title === 'Details') {
            params.hideDetails();
          }
          else {
            params.goBack();
          }
          }}>
          <ArrowBack/>
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity onPress={() => params.showDetails()}>
          {
            params && params.title && params.title !== 'Details' ?
            <Image
              style={styles.imageMiniStyle}
              source={{uri: params.detailsImage}}
            /> : null
          }
        </TouchableOpacity>,
    });
  }

  constructor(props: any) {
    super(props);
    this.state = {
      showDetails: false,
      showOverlay: false,
    };
  }

  public componentWillMount() {
    const { navigation, chat, auth } = this.props;
    const { userID } = auth;
    let { users } = chat;
    users = users.filter((user: any) => user.id !== Number.parseInt(userID));
    navigation.setParams({
      showDetails: this.showDetails.bind(this),
      hideDetails: this.hideDetails.bind(this),
      title: renderNames(users),
      goBack: this.onGoBack.bind(this),
    });
    if (users) {
      navigation.setParams({
        detailsImage: users[0].id !== Number.parseInt(userID) ? users[0].image : users[1].image,
      });
    }
    this.checkNewMessage();
  }

  private onGoBack() {
    clearInterval(this.interval);
    this.props.clearChat();
    this.props.navigation.navigate('ChannelList');
  }

  public componentDidUpdate(prevProps: any) {
    const { navigation, chat, auth } = this.props;
    const { userID } = auth;
    let { users } = chat;
    users = users.filter((user: any) => user.id !== Number.parseInt(userID));
    if (!prevProps.chat.users && chat.users) {
      navigation.setParams({
        detailsImage: users[0].id !== Number.parseInt(userID) ? users[0].image : users[1].image,
      });
    }
  }

  private renderNames = () => {
    const { chat, auth } = this.props;
    const { userID } = auth;
    let { users } = chat;
    users = users.filter((user: any) => user.id !== Number.parseInt(userID));
    return renderNames(users);
  }

  private showDetails = () => {
    const {navigation} = this.props;
    navigation.setParams({title: "Details"});
    this.setState({
      showDetails: true,
      showOverlay: true,
    });
  }

  private hideDetails = () => {
    const {navigation} = this.props;
    navigation.setParams({ title: this.renderNames() });
    this.setState({
      showDetails: false,
      showOverlay: false,
    });
  }

  private onSend = (messages: any) => {
    const message = messages[0];
    const newMessage = {};
    (newMessage as any)['text'] = message.text || "";
    message.image ? (newMessage as any)['image'] = message.image : null;
    (newMessage as any)['mobile_uid'] = message._id;
    (newMessage as any)['position'] = this.props.chat.messages.length + 1;
    this.props.sendMessage(newMessage, messages);
  }

  private checkNewMessage = () => {
    const {chat} = this.props;
    this.interval = setInterval(() => {
      this.props.getNewMessages(chat.id)
    }, 2000);
  }

  private renderMessage = (props: any) => {
    return (
      <CustomMessage {...props}/>
    )
  }

  private renderInputToolbar = (props: any) => {
    return (
      <CustomInputToolbar {...props}/>
    )
  }

  private pickAnImage = () => {
    const { userID } = this.props.auth;
    ImagePicker.showImagePicker((response: any) => {
      console.log('showImagePicker response: ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        // console.log('response.uri: ', response.uri);
     
        // You can also display the image using data:
        const fileExtention = response.fileName.split('.').pop();
        const dataEncode = fileExtention.toUpperCase() === "PNG" ? 'png' : 'jpeg'
        const source = `data:image/${dataEncode};base64,` + response.data;
        console.log('source: ', source);
        const newMessage = {
          _id: uuidv4(),
          createdAt: new Date(),
          image: source,
          user: {
            _id: userID,
          },
          name: response.fileName,
        };
        // console.log('newMessage: ', newMessage);
        this.onSend([newMessage]);
      }
    });
  }

  private renderActions = () => {
    return (
      <View style={styles.actionIconsContainer}>
        <ReactElements.Icon
          name="camera"
          type="simple-line-icon"
          iconStyle={styles.addImageIcon}
          size={28}
          color="#cfcfcf"
          onPress={() => this.pickAnImage()}
        />
        {/* <ReactElements.Icon
          name="paperclip"
          type="foundation"
          iconStyle={styles.addImageIcon}
          size={28}
          color="#cfcfcf"
          onPress={() => null}
        /> */}
      </View>
    )
  }

  public render() {
    const { chat } = this.props;
    let { users } = chat;
    const { userID } = this.props.auth;
    users = users.filter((user: any) => user.id !== Number.parseInt(userID));
    return(
      <View style={{flex: 1}}>
        <Details show={ this.state.showDetails } users={ users }/>
        <Overlay show={ this.state.showOverlay }/>
        <GiftedChat
          messages={chat.messages}
          onSend={(messages: any) => this.onSend(messages)}
          user={{
            _id: userID,
          }}
          parsePatterns={(linkStyle: any) => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: 'lightgreen' },
              // onPress: (props: any) => alert(`press on ${props}`),
            },
          ]}
          alwaysShowSend={true}
          renderAvatar={() => null}
          renderMessage={this.renderMessage.bind(this)}
          renderActions={() => this.renderActions()}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          placeholder="Type message..."
          placeholderTextColor="#7c7c7c"
          textInputStyle={{
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
            color: '#7c7c7c',
          }}
          listViewProps={{
            style: {backgroundColor: '#efefef'}
          }}
          textInputProps={{
            autoCapitalize: "none",
            autoCorrect: false,
            underlineColorAndroid: 'rgba(0,0,0,0)',
            ...Platform.select({
              ios: {
                marginTop: 10,
              },
              android: {
                marginTop: 5,
              },
            }),
            alignSelf: 'flex-start',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageMiniStyle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 15,
  },
  actionIconsContainer: {
    width: 45, // 90 with add file
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 10,
    paddingBottom: 5,
  },
  addImageIcon: {

  },
});
