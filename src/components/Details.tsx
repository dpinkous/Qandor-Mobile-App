import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ICONS } from './common';

const SettingsList = require('react-native-settings-list');
const ReactElements = require('react-native-elements');

export default class Details extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onMuteChange = this.onMuteChange.bind(this);
    this.state = {
      mute: false,
    };
  }

  private renderMembers = () => {
    const { users } = this.props;
    return users.map((member: any, index: number) => (
      <View style={styles.memberContainer} key={index}>
        <Image
          source={{uri: member.image}}
          style={styles.memberImage}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.username}</Text>
          <Text style={styles.memberPhone}>{member.phone_number}</Text>
        </View>
        <View style={styles.connectIconContainer}>
          <TouchableOpacity>
            <View style={styles.connectIconBucket}>
              <Image
                source={ ICONS.facetime }
                style={styles.connectVideoIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.connectIconBucket}>
              <Image
                source={ ICONS.phone }
                style={styles.connectPhoneIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ))
  }

  private onMuteChange = () => {
    this.setState({mute: !this.state.mute});
    // TODO: send info to keep muted
    return null;
  }

  public render() {
    const { show, users } = this.props;
    if (!show || users.length === 0) {
      return null;
    }
    return (
      <View style={styles.detailsContainer}>
        <ScrollView style={styles.scrollStyle}>
          {this.renderMembers()}
          <TouchableOpacity>
            <View style={styles.memberContainer}>
              <View style={styles.addIconBackground}>
                <ReactElements.Icon
                  name="plus"
                  type="octicon"
                  color="#2077f3"
                  size={34}
                  iconStyle={styles.addIconStyle}
                />
              </View>
              <View style={styles.addMemberBucket}>
                <Text style={styles.memberName}>Add Member...</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={{bottom: -20}}>
        {/* <View style={styles.groupNameContainer}>
          <Text style={[styles.settingsText, styles.groupNameText]}>Group Name</Text>
          <Text style={styles.groupNameInput}>{details.name}</Text>
        </View> */}
        {/* <SettingsList borderColor="transparent">
          <SettingsList.Item
            hasNavArrow={false}
            hasSwitch={true}
            switchState={this.state.mute}
            switchOnValueChange={this.onMuteChange}
            onPress={() => this.onMuteChange()}
            title='Mute conversation'
            titleStyle={[styles.settingsText, styles.muteSettingsText]}
            style={styles.muteSettingsStyle}
          />
        </SettingsList> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    maxHeight: '70%',
    padding: 30,
    backgroundColor: '#fff',
    zIndex: 9001,
    borderBottomWidth: 2,
    borderColor: '#dadbdd',
  },
  scrollStyle: {
    width: '100%',
  },
  memberContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderColor: '#f0f0f0',
    marginBottom: 20,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  memberInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  memberName: {
    color: '#434343',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  memberPhone: {
    color: '#2077f4',
    fontSize: 14,
  },
  connectIconContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  connectIconBucket: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#2077f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectVideoIcon: {
    width: 20,
    height: 12,
  },
  connectPhoneIcon: {
    height: 20,
    width: 20,
  },
  addIconBackground: {
    height: 70,
    backgroundColor: '#efefef',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  addIconStyle: {
    margin: 12,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 2,
  },
  addMemberBucket: {
    justifyContent: 'center',
  },
  groupNameContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    // borderColor: '#f0f0f0',
    // paddingBottom: 20,
  },
  groupNameText: {
    marginTop: 12,
  },
  groupNameInput: {
    flex: 1,
    color: '#626262',
    fontSize: 16,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
  },
  muteSettingsStyle : {
    borderWidth: 1,
    borderColor: '#0f0',
  },
  muteSettingsText : {
    marginLeft: -15,
  },
  settingsText: {
    color: '#727272',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});
