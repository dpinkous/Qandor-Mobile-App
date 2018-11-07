import * as React from 'react';
import { Image, Keyboard, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const ReactElements = require('react-native-elements');
const { connect } = require('react-redux');

import { addMember } from '../actions/';

@connect(
  null, { addMember },
)
export default class TeamAddMember extends React.Component<any, any> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  constructor(props: any) {
    super(props);
  
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  
    this.state = {
      email: '',
      keyboard: false,
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
    this.setState({keyboard: e.endCoordinates.height});
  }

  private keyboardDidHide() {
    this.setState({keyboard: false});
  }

  private renderRecomended = () => {
    const {proposal, position} = this.props;
    if (!proposal) {
      return null;
    }
    return proposal.map((user: any, index: number) => (
      <View style={styles.proposalContainerStyle} key={index}>
        <Image
          source={{uri: user.image}}
          style={styles.imageStyle}
        />
        <View style={styles.proposalInfoBox}>
          <View style={styles.proposalInfoText}>
            <Text style={styles.userNameText}>{user.username}</Text>
            {/* <Text style={styles.recByText}>Recomended by</Text> */}
            {/* <Text style={styles.recByText}>{user.proposalBy}</Text> */}
          </View>
          <ReactElements.Button
            title="Add" // Invite
            borderRadius={15}
            buttonStyle={styles.inviteButtonStyle}
            textStyle={styles.inviteButtonText}
            onPress={() => {
              this.props.addMember(user.id);
              this.props.hide();
            }}
          />
        </View>
      </View>
    ));
  }

  public render() {
    const { show, position } = this.props;
    if (!show) {
      return null;
    }
    return (
      <View
        style={[styles.addMemberContainerStyle, {
          ...Platform.select({
            android: {
              maxHeight: this.state.keyboard ? '100%' : '80%',
            },
            ios: {
              maxHeight: this.state.keyboard ? '70%' : '80%',
            },
          })
        }]}
      >
        {
          position !== '' ?
            <View style={styles.positionNameStyle}>
              <Text style={styles.positionNameText}>{position}</Text> 
            </View> : null
        }
        <ScrollView style={styles.scrollStyle}>
          {this.renderRecomended()}
        </ScrollView>
        <View style={styles.emailInvite}>
          <TextInput
            placeholder={`My${position.replace(/ /g, '') || "NewTeamMember"}@mail.com`}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.emailText}
            numberOfLines={1}
          />
          <ReactElements.Button
            title="Invite"
            backgroundColor=""
            borderRadius={15}
            buttonStyle={styles.inviteButtonStyle}
            textStyle={styles.inviteButtonText}
            onPress={() => null}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addMemberContainerStyle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    maxHeight: '80%',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: 9001,
    borderBottomWidth: 2,
    borderColor: '#dadbdd',
  },
  positionNameStyle: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 0.4,
    borderColor: '#ebebeb',
  },
  positionNameText: {
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#434343',
    fontSize: 16,
  },
  scrollStyle: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  proposalContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderColor: '#ebebeb',
    paddingBottom: 20,
    marginBottom: 20,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  proposalInfoBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    alignItems: 'center',
  },
  proposalInfoText: {
    flex: 1,
  },
  userNameText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  recByText: {
    fontSize: 12,
    color: '#666',
  },
  inviteButtonStyle: {
    height: 35,
    width: 90,
    backgroundColor: '#2077f4',
    borderRadius: 3,
    margin: 0,
    marginRight: -15,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  emailInvite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },
  emailText: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 3,
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
});
