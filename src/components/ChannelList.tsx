import * as React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { connect } = require('react-redux');

import ChannelItem from './ChannelItem';
import Search from './Search';
import CustomIcon from './common/CustomIcon';
import { COLORS } from '../TabBarNavigation';
import { ViewHeader, UnreadIndicator, ICONS } from './common';
import { findNewChannels } from './Utils';
import { getChannels, searchChannel, getOwnProfile, searchReset } from '../actions';
import { IAppState } from '../reducers';
import { API_URL } from '../App';

@connect(
  (state: IAppState) => {
    const { channels, search, auth } = state;
    return { channels, search, auth }
  }, { getChannels, getOwnProfile, searchChannel, searchReset },
)
export default class Messages extends React.Component<any, any> {
  interval: any;
  timer: any;
  public static navigationOptions = ({navigation}: any) => {
    const { params } = navigation.state;
    return ({
      title: <ViewHeader title="Messages" bold/>,
      headerTitleStyle: {
        alignSelf: 'center',
        color: COLORS.WHITE,
      },
      tabBarIcon: ({ tintColor }: any) => {
        return (
        <View>
          <CustomIcon
            name="message_icon"
            size={ 30 }
            color={ tintColor }
          />
        { params && params.renderUnreade ? params.renderUnreade() : null }
        </View>
      )},
      headerLeft:
        <TouchableOpacity onPress={ () => params.goToSettings() }>
          {
            params && params.userImage ?
            <Image
              source={ { uri: params.userImage } }
              style={ {
                width: 32,
                height: 32,
                marginLeft: 15,
                borderRadius: 16,
              } }
            /> :
            <Text
              style={ {
                color: COLORS.WHITE,
                marginLeft: 15,
                fontSize: 16.
              } }
            >Edit</Text>
          }
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity onPress={ () => params.goToNewMessage() }>
          <Image
            source={ ICONS.new_message }
            style={ {
              width: 25,
              height: 25,
              marginRight: 15,
            } }
            resizeMode='contain'
          />
        </TouchableOpacity>,
    });
  };

  constructor(props: any) {
    super(props);

    this.state = {
      goSettings: true,
      goNewMessage: true,
      unread: 0,
      search: false,
      searchValue: '',
    };
  }

  public componentWillMount() {
    this.props.getChannels();
    const { navigation } = this.props;
    navigation.setParams({
      goToSettings: this.goToSettings,
      goToNewMessage: this.goToNewMessage,
      renderUnreade: this.renderUnreade,
      userImage: '',
    });
    this.setState({
      goSettings: true,
      unread: 0,
    });
    this.checkNewMessages();
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    const { channels, navigation, auth } = this.props;
    const { params } = navigation.state;
    const newUnread = findNewChannels(channels);
    const { userID, user } = auth;
    if (!userID) clearInterval(this.interval);
    if (user && params && !params.userImage) {
      let { image } = user.user;
      if (!/^http/.test(image)) {
        image = API_URL.slice(0, -4) + image
      }
      navigation.setParams({ userImage: image });
    }
    if (prevState.unread === newUnread) return;
    if (channels && newUnread) {
      const oldUnread = findNewChannels(prevProps.channels);
      if ((newUnread !== oldUnread) || (params && newUnread !== params.newMessages)) {
        this.setState({ unread: newUnread })
      }
    }
    else if (params && newUnread === 0 && newUnread !== params.newMessages) {
      this.setState({ unread: newUnread })
    }
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  private goToSettings = () => {
    if (this.state.goSettings) {
      this.setState({ goSettings: false });
      this.props.getOwnProfile();
      setTimeout(() => {
        this.setState({ goSettings: true });
      }, 1000);
    }
  }

  private goToNewMessage = () => {
    if (this.state.goNewMessage) {
      this.setState({ goNewMessage: false });
      this.props.navigation.navigate('NewMessage');
      setTimeout(() => {
        this.setState({ goNewMessage: true });
      }, 1000);
    }
  }

  private renderUnreade = () => (
    <UnreadIndicator unread={ this.state.unread }/>
  );

  private renderListItem = (item: any, index: number) => {
    return (
      <ChannelItem key={ index } data={ item } search={ this.state.search } searchReset={ () => this.searchReset() }/>
    );
  }

  private searchChannels = (text: string) => {
    if (text.length < 3) {
      this.searchReset();
    }
    else {
      this.props.searchChannel(text);
      this.setState({ search: true });
    }
  }

  private searchReset = () => {
    setTimeout(() => {
      this.setState({ search: false, searchValue: '' });
      this.props.searchReset();
    }, 500);
  }

  private checkNewMessages = () => {
    this.interval = setInterval(() => {
      this.props.getChannels();
    }, 5000);
  }

  private onSearchChange = (searchValue: string) => {
    this.setState({ searchValue });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.searchChannels(searchValue);
    }, 2000);
  }



  public render() {
    const { search, channels } = this.props;
    const data = search.length > 0 ? search :
      channels.sort((obj1: any, obj2: any) => {
        if (obj1.last_message_time && obj2.last_message_time) {
          if (new Date(obj1.last_message_time) > new Date(obj2.last_message_time)) return -1;
          else if (new Date(obj1.last_message_time) < new Date(obj2.last_message_time)) return 1
          else return 0;
        }
        else if (obj1.last_message_time && !obj2.last_message_time) return -1;
        else if (!obj1.last_message_time && obj2.last_message_time) return 1;
        else return 0;
      });
    return(
      <View style={styles.container}>
        <View style={styles.searchContainerStyle}>
          <Search value={ this.state.searchValue } onChange={ (text: string) => this.onSearchChange(text) }/>
        </View>
        <View style={styles.listStyle}>
          <FlatList
            data={ data }
            renderItem={({ item, index }) => this.renderListItem(item, index)}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTextStyle: {

  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  searchContainerStyle: {
    height: 40,
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  listStyle: {
    flex: 1,
    width: '100%',
  },
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
