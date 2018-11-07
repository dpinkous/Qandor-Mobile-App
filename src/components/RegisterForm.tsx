import * as React from 'react';
import { Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, View, Platform } from 'react-native';

const ReactElements = require('react-native-elements');
const { connect } = require('react-redux');

import { register } from '../actions';
import { LOGO } from './common';

const Screen = Dimensions.get('window');

@connect(
  null, { register },
)
export default class RegisterForm extends React.Component<any, any> {
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
  constructor(props: any) {
    super(props);
  
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  
    this.state = {
      password1: '',
      password2: '',
      email: '',
      errorMSG: '',
      marginBottom: 0,
    };
  }

  public componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  public componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  private keyboardWillShow() {
    this.setState({
      marginBottom: 120,
    });
  }

  private keyboardWillHide() {
    this.setState({
      marginBottom: 0,
    });
  }
  
  get validateEmail() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(this.state.email);
  }
  
  get validatePassword2() {
    return this.state.password2 === this.state.password1 && this.state.password1 !== '';
  }

  get enableSignUp() {
    return this.state.password1 && this.state.password2 && this.state.email;
  }
  
  private register = () => {
    const validPasswd2 = this.validatePassword2;
    const validEmail = this.validateEmail;
    this.setState({errorMSG: ''});
    if (validPasswd2 && validEmail) {
      this.props.register(this.state.password1, this.state.email);
    }
    else if (!validPasswd2) {
      this.setState({errorMSG: 'Passwords must match'});
    }
    else if (!validEmail) {
      this.setState({errorMSG: 'Enter correct email'});
    }
  }

  public render() {
    return (
      <ScrollView bounces={false} contentContainerStyle={[styles.container, {
        ...Platform.select({
          ios: {
            marginBottom: this.state.marginBottom,
          },
        })
      }]}>
        <View style={styles.top}>
          <View style={styles.ImageContainerStyle}>
          <Image
              style={styles.ImageStyle}
              source={ LOGO }
            />
            <Text style={styles.logoText}>Qandor</Text>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={ (email) => this.setState({ email, errorMSG: '' }) }
              value={this.state.email}
              placeholder="Email"
              placeholderTextColor="#2078f5"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={ (password1) => this.setState({ password1, errorMSG: '' }) }
              value={this.state.password1}
              placeholder="Password"
              placeholderTextColor="#2078f5"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={ (password2) => this.setState({ password2, errorMSG: '' }) }
              value={this.state.password2}
              placeholder="Confirm Password"
              placeholderTextColor="#2078f5"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.errorStyle}>{this.state.errorMSG}</Text>
          <ReactElements.Button
            large
            title="SIGN UP"
            borderRadius={ 4 }
            disabled={ !this.enableSignUp }
            backgroundColor="#2077f4"
            textStyle={ styles.signUpButtonText }
            buttonStyle={ styles.signUpButton }
            onPress={ () => this.register() }
          />
          <ReactElements.Button
            title="Back To Login"
            backgroundColor="transparent"
            textStyle={ styles.signInButtonText }
            buttonStyle={ { margin: 0 } }
            onPress={ () => this.props.navigation.goBack() }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  top: {
    // flex: 3,
    height: Screen.height * 0.75,
    justifyContent: 'center',
    paddingTop: 50,
    width: '80%',
  },
  ImageContainerStyle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    height: 90,
    width: 90,
  },
  logoText: {
    fontSize: 28,
    color: '#2077f4',
    fontFamily: 'Montserrat-Bold',
  },
  inputContainerStyle: {
    flex: 3,
  },
  inputStyle: {
    width: '100%',
    height: 50,
    borderRadius: 4,
    backgroundColor: '#efefef',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: '#2078f5',
  },
  bottom: {
    // flex: 1,
    height: Screen.height * 0.25,
    width: '80%',
    justifyContent: 'center',
  },
  errorStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
  },
  signUpButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
  signUpButton: {
    margin: 0,
    marginLeft: -15,
    marginRight: -15,
    marginTop: 20,
    height: 55,
  },
  signInButtonText: {
    color: '#2078f5',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
