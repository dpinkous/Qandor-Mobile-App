import * as React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { API_URL } from '../App';
import { ArrowBack, ViewHeader } from './common';
import CustomIcon from './common/CustomIcon';

const { connect } = require('react-redux');
const ReactElements = require('react-native-elements');

export default class EditProfile extends React.Component<any, any> {
  public static navigationOptions = ({navigation}: any) => {
    return ({
      headerLeft:
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBack/>
        </TouchableOpacity>,
      title: <ViewHeader title="Edit Profile" bold/>,
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
        </View>
      )},
      headerRight: <View style={ { width: 30, height: 30 } }/>,
    });
  }
  constructor(props: any) {
    super(props)
    this.state = {
      image: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      position: null,
    };
  }

  private profileEditable = {
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    email: 'Email',
  }

  public componentWillMount() {
    const { navigation } = this.props;
    const { params = null } = navigation.state;
    if (params && params.profile) {
      const { profile } = params;
      this.setState({
        image: `${ API_URL.slice(0, -4) }${ profile.image }`,
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phoneNumber: profile.phoneNumber || '',
        email: profile.email || '',
        position: profile.position || null,
      });
    }
  }

  private renderEditable = () => {
    return Object.keys(this.profileEditable).map((item: any, index: number) => (
      <View style={ styles.section } key={ index }>
        <Text style={ styles.header }>{ `${ (this.profileEditable as any)[item] }:` }</Text>
        <TextInput
          value={ this.state[item] }
          style={ styles.inputText }
          placeholder={`Your ${ (this.profileEditable as any)[item] }`}
          placeholderTextColor="#000"
        />
      </View>
    ));
  }

  private renderPicker = () => (
    <View style={ styles.section }>
      <Picker
        selectedValue={ this.state.position }
        onValueChange={ (position: string) => this.setState({ position }) }
        mode="dropdown"
        style={ styles.pickerStyle }
      >
        <Picker.Item label="-------------" value={ null } />
        <Picker.Item label="Financial Advisor" value="financial_advisor" />
        <Picker.Item label="Insurance Agent" value="insurance_agent" />
        <Picker.Item label="Attorney" value="attorney" />
        <Picker.Item label="Real Estate Agent" value="real_estate_agent" />
        <Picker.Item label="Tax Pro" value="tax_pro" />
        <Picker.Item label="Mortgage Pro" value="mortgage_pro" />
      </Picker>
    </View>
  );
  

  public render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.section }>
          <Text style={ styles.header }>Image</Text>
          <View style={ styles.changeImage }>
            <Image
              source={ { uri: this.state.image } }
              style={ styles.image }
            />
            <ReactElements.Button
              title="Choose another"
              containerViewStyle={ styles.buttonContainer }
              buttonStyle={ styles.button }
              textStyle={ styles.buttonText }
            />
          </View>
        </View>
        <TouchableOpacity style={ styles.section }>
          <Text style={ styles.header }>Change Password</Text>
        </TouchableOpacity>
        { this.renderEditable() }
        { this.renderPicker() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  section: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  changeImage: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
  },
  buttonContainer: {

  },
  button: {

  },
  buttonText: {

  },
  inputText: {

  },
  pickerStyle: {
    height: 70,
  },
});
