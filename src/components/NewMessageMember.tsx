import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

const ReactElements = require('react-native-elements');

export default class NewMessageMember extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  private onPress = () => {
    const { addMember, removeMember, user } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked });
    if (!checked) addMember(user.id);
    else removeMember(user.id);
  }

  render() {
    const { user } = this.props;
    const { full_name, username } = user;

    return (
      <TouchableOpacity style={ styles.container } onPress={ () => this.onPress() }>
        <View style={ styles.imageWrapper }>
          <Image
            source={ { uri: user.image } }
            style={ styles.image }
          />
        </View>
        <Text style={ styles.usernameText }>{ full_name  ? full_name : username }</Text>
        <ReactElements.CheckBox
          checked={ this.state.checked }
          right
          containerStyle={ styles.checkBox }
          onPress={ () => this.onPress() }
        />
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#888',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  usernameText: {
    flex: 1,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0
  },
});
