import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { connect } = require('react-redux');

import TeamMember from './TeamMember';
import TeamAddMember from './TeamAddMember';
import { chunkArray } from './Utils';
import { ArrowBack, Overlay, ViewHeader } from './common';
import { IAppState, IMember } from '../reducers';
import { getTeam, getProfile, searchNewMember } from '../actions/';

@connect(
  (state: IAppState) => {
    const { team } = state;
    return { team };
  }, { getTeam, getProfile, searchNewMember },
)
export default class Team extends React.Component<any, any> {
  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;
    return ({
      headerLeft:
        <View>
          {
            params && params.title === "Add a Team Member" ?
              <TouchableOpacity onPress={() => params.goBack() || null}>
                <ArrowBack/>
              </TouchableOpacity> : null
          }
        </View>,
      title: <ViewHeader title={params ? params.title : "Team"} bold/>,
      headerTitleStyle: {
        alignSelf: 'center',
        color: '#fff',
      },
      headerRight: <View style={{width: 30, height: 30}}/>,
    });
  };

  constructor(props: any) {
    super(props);
    this.state = {
      addMemberModal: false,
      addMemberPosition: '',
      enablePress: true,
    };
  }

  public componentWillMount() {
    this.props.getTeam();
  }

  private findMemberWithPosition = (position: string) => {
    const {users} = this.props.team;
    return users.find((member: IMember) => member.position === position) || null
  }

  private membersWithOutPosition = () => {
    const {users} = this.props.team;
    return users.filter((member: IMember) => !member.position || (member.position && member.position === ""))
  }

  private closeAddMember = () => {
    const {navigation} = this.props;
    navigation.setParams({
      title: "Team",
      goBack: null
    });
    this.setState({addMemberModal: false, addMemberPosition: ''});
  }

  private handlePress = (member: any, position: string) => {
    if (member && this.state.enablePress) {
      this.setState({enablePress: false});
      this.props.getProfile(member.id);
      setTimeout(() => {
        this.setState({enablePress: true});
      }, 1000);
    }
    else if (!member) {
      this.props.searchNewMember(position.toLowerCase().replace(/ /g, '_'));
      this.setState({addMemberModal: true, addMemberPosition: position || ''});
      const {navigation} = this.props;
      navigation.setParams({
        title: "Add a Team Member",
        goBack: this.closeAddMember,
      });
    }
  }

  private renterMember = (position: string, member: any) => (
    <TeamMember position={position} member={member} onPress={() => this.handlePress(member, position)}/>
  )

  private renderRestOfMembers = (restOfTeam: any) => {
    if (restOfTeam.length % 2 === 0) {
      restOfTeam.push(null)
    }
    const pairs = chunkArray(restOfTeam, 2);
    return pairs.map((pair: any, index: number) => (
      <View style={styles.memberPairStyle} key={index}>
        {this.renterMember("", pair[0] || null)}
        {this.renterMember("", pair[1] || null)}
      </View>
    ));
  }

  public render() {
    const restOfTeam = this.membersWithOutPosition();
    const { proposal } = this.props.team;
    return(
      <View style={styles.container}>
        <TeamAddMember
          show={ this.state.addMemberModal }
          position={ this.state.addMemberPosition }
          proposal={ proposal }
          hide={ () => this.closeAddMember() }
        />
        <Overlay show={ this.state.addMemberModal }/>
        <ScrollView contentContainerStyle={styles.scrollStyle}>
          <View style={{flex: 1, alignItems: 'center',}}>
            <View style={styles.memberPairStyle}>
              {this.renterMember("Financial Advisor", this.findMemberWithPosition("financial_advisor"))}
              {this.renterMember("Insurance Agent", this.findMemberWithPosition("insurance_agent"))}
            </View>
            <View style={styles.memberPairStyle}>
              {this.renterMember("Attorney", this.findMemberWithPosition("attorney"))}
              {this.renterMember("Real Estate Agent", this.findMemberWithPosition("real_estate_agent"))}
            </View>
            <View style={styles.memberPairStyle}>
              {this.renterMember("Tax Pro", this.findMemberWithPosition("tax_pro"))}
              {this.renterMember("Mortgage Pro", this.findMemberWithPosition("mortgage_pro"))}
            </View>
            {
              this.renderRestOfMembers(restOfTeam || [null])
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollStyle: {
    width: '100%',
    paddingTop: 20,
  },
  memberPairStyle: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 140,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.4,
    borderColor: '#ebebeb',
  },
});
