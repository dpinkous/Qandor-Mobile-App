import * as React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const { connect } = require('react-redux');
const SettingsList = require('react-native-settings-list');

import CustomIcon from './common/CustomIcon';
import { ArrowBack, ViewHeader, UnreadIndicator, ICONS} from './common';
import { findNewChannels } from './Utils';
import { IAppState } from '../reducers';

@connect(
  (state: IAppState) => {
    const { profile, channels } = state;
    return { profile, channels }
  },
)
export default class Settings extends React.Component<any, any> {
  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;
    return ({
      headerLeft:
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBack/>
        </TouchableOpacity>,
      title: <ViewHeader title="Settings" bold/>,
      headerTitleStyle: {
        alignSelf: 'center',
        color: '#fff',
      },
      tabBarIcon: ({tintColor}: any) => {
        return (
        <View>
          <CustomIcon
            name="message_icon"
            size={ 30 }
            color={ tintColor }
          />
        {params && params.renderUnreade ? params.renderUnreade() : null}
        </View>
      )},
      headerRight: <View style={ { width: 30, height: 30 } }/>,
    });
  }

  constructor(props: any) {
    super(props);
    this.onSnoozChange = this.onSnoozChange.bind(this);
    this.onNotificationsChange = this.onNotificationsChange.bind(this);
    this.state = {
      snooz: false,
      unread: 0,
      notifications: false,
    };
  }

  public componentWillMount() {
    const {channels, navigation} = this.props;
    const unread = findNewChannels(channels);
    this.setState({unread});
    navigation.setParams({
      renderUnreade: this.renderUnreade,
    });
  }


  private onSnoozChange = () => {
    this.setState({snooz: !this.state.snooz})
  }

  private onNotificationsChange = () => {
    this.setState({notifications: !this.state.notifications})
  }

  private renderUnreade = () => {
    return (
    <UnreadIndicator unread={this.state.unread}/>
  )};

  public render() {
    const { profile, navigation } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.userContainer}
          onPress={ () => navigation.navigate('EditProfile', { profile }) }
        >
          <Image
            source={{uri: profile.image}}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.profileName}>{profile.username}</Text>
            <Text style={styles.profileText}>Edit Personal Profile Information</Text>
          </View>
          <Image
            source={ ICONS.arrow_dark }
            style={styles.profileArrow}
          />
        </TouchableOpacity>
        <SettingsList borderColor="#eaeaea">
          <SettingsList.Header
            headerText='General Settings'
            headerStyle={styles.headerText}
          />
          <SettingsList.Item
            title='Invite Friends'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
          <SettingsList.Item
            title='Recomend a Profesional'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
          <SettingsList.Item
            hasNavArrow={false}
            hasSwitch={true}
            switchState={this.state.snooz}
            switchOnValueChange={this.onSnoozChange}
            title='Snooze Notifications'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
          <SettingsList.Item
            hasNavArrow={false}
            hasSwitch={true}
            switchState={this.state.notifications}
            switchOnValueChange={this.onNotificationsChange}
            title='Notifications On/Off'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
          <SettingsList.Item
            title='Link Device'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
          <SettingsList.Item
            title='Sync Contacts'
            backgroundColor='#fff'
            titleStyle={styles.settingsText}
            arrowStyle={styles.settingsArrow}
            onPress={() => null}
          />
        </SettingsList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  userContainer: {
    flexDirection: 'row',
    height: 70,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
    borderColor: '#eaeaea',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  profileName: {
    color: '#434343',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  profileText: {
    color: '#878787',
    fontSize: 12,
  },
  profileArrow: {
    width: 8,
    height: 14,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#434343',
    marginLeft: 30,
  },
  settingsText: {
    color: '#727272',
    marginLeft: 20,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  settingsArrow: {
    tintColor: '#757575',
    marginRight: 30,
  },
});
