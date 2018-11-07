import * as React from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { IAppState } from '../reducers';
import { ViewHeader, ArrowBack } from './common';
const { connect } = require('react-redux');
const ReactElements = require('react-native-elements');

import Member from './NewMessageMember';
import { COLORS } from '../TabBarNavigation';
import { createCannel } from '../actions';

@connect(
  (state: IAppState) => {
    const { team, auth } = state
    return { team, auth };
  }, { createCannel }
)
export default class NewMessage extends React.Component<any, any> {
  public static navigationOptions = ({navigation}: any) => {
    return({
      title: <ViewHeader title="New Message To" bold/>,
      headerTitleStyle: {
        alignSelf: 'center',
        color: '#fff',
      },
      headerLeft:
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBack/>
        </TouchableOpacity>,
      headerRight: <View style={{width: 30, height: 30}}/>,
    });
  }

  constructor(props: any) {
    super(props);
    this.state = {
      members: []
    };
  }

  componentDidUpdate() {
    console.log('members: ', this.state.members);
  }

  private addMember = (id: number) => {
    const { members } = this.state;
    const index = members.indexOf(id);
    console.log('addMember: ', id, index);
    if (index === -1) members.push(id);
    this.setState({ members });
  }

  private removeMember = (id: number) => {
    const { members } = this.state;
    const index = members.indexOf(id);
    console.log('removeMember: ', id, index);
    if (index !== -1) members.splice(index, 1);
    this.setState({ members });
  }

  private renderListItem = (user: any, index: number) => (
    <Member
      user={ user }
      key={ index }
      addMember={ (id: number) => this.addMember(id) }
      removeMember={ (id: number) => this.removeMember(id) }
    />
  )

  private createConversation = () => {
    let { members } = this.state;
    const { userID } = this.props.auth;
    members.push(Number.parseInt(userID));
    console.log('createConversation: ', members);
    this.props.createCannel(members);
  }

  get enableCreateCannel() {
    return this.state.members.length > 0;
  }

  render() {
    const { team, auth } = this.props;
    let { users } = team;
    const { userID } = auth;
    users = users.filter((user: any) => user.id !== Number.parseInt(userID));
    return (
      <View style={ styles.container }>
        <View style={ { flex: 1 } }>
          <FlatList
            data={ users }
            renderItem={({ item, index }) => this.renderListItem(item, index)}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <ReactElements.Button
          large
          title="CREATE NEW CONVERSATION"
          borderRadius={ 4 }
          disabled={ !this.enableCreateCannel }
          backgroundColor={ COLORS.BLUE }
          textStyle={ styles.buttonText }
          buttonStyle={ styles.button }
          onPress={ () => this.createConversation() }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  button: {
    marginBottom: 15,
  },
  buttonText: {
    
  },
});
