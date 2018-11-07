import * as React from 'react';
import { AsyncStorage, Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const ReactElements = require('react-native-elements');
const { connect } = require('react-redux');

import LoadingScreen from './LoadingScreen';
import { login, setLogged, setProfile } from '../actions';
import { IAppState } from '../reducers';
import { COLORS } from '../TabBarNavigation';
import { LOGO } from './common';

const Screen = Dimensions.get('window');

@connect(
  (state: IAppState) => {
    const { auth } = state;
    return { auth };
  }, { login, setLogged, setProfile },
)
export default class LoginForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      username: '',
      rememberMe: false,
      checkingLogged: true,
    };
  }

  public componentWillMount() {
    // AsyncStorage.clear();
    this.isLogged();
  }

  get signIn() {
    return this.state.password !== '' && this.state.username !== ''
  }

  private tryLogin = () => {
    Keyboard.dismiss();
    this.props.login(this.state.username, this.state.password, this.state.rememberMe);
  }

  private isLogged = async () => {
    try {
      const loggedValue = await AsyncStorage.getItem('loggedIn');
      const lastUser = await AsyncStorage.getItem('lastUser');
      if (loggedValue !== null) {
        const user = JSON.parse(loggedValue);
        this.props.setLogged(user.token, user.userID);
        if (lastUser !== null) {
          const profile = JSON.parse(lastUser).user;
          this.props.setProfile(profile);
        }
        this.props.navigation.navigate('MainScreen');
      }
      else {
        this.setState({ checkingLogged: false });
      }
    }
    catch(error) {
      console.log(error);
      this.setState({ checkingLogged: false });
    }
  }

  public render() {
    const { error } = this.props.auth;
    if (this.state.checkingLogged) {
      return (
        <LoadingScreen/>
      )
    }
    return (
      <ScrollView contentContainerStyle={ styles.container }>
        <View style={ styles.top }>
          <View style={ styles.ImageContainerStyle }>
            <Image
              style={ styles.ImageStyle }
              source={ LOGO }
            />
            <Text style={ styles.logoText }>Qandor</Text>
          </View>
          <View style={ styles.inputContainerStyle }>
            <TextInput
              style={ styles.inputStyle }
              onChangeText={ (username) => this.setState({username})  }
              value={ this.state.username }
              placeholder="Username"
              placeholderTextColor={ COLORS.BLUE }
              autoCapitalize="none"
              autoCorrect={ false }
              underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput
              style={ styles.inputStyle }
              secureTextEntry={ true }
              onChangeText={ (password) => this.setState({password})  }
              value={ this.state.password }
              placeholder="Password"
              placeholderTextColor={ COLORS.BLUE }
              autoCapitalize="none"
              autoCorrect={ false }
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
          <View style={ styles.loginOptionStyle }>
            <ReactElements.CheckBox
              checked={ this.state.rememberMe }
              onPress={ () => this.setState({rememberMe: !this.state.rememberMe}) }
              title="Remember Me"
              textStyle={ styles.rememberMeTextStyle }
              style={ styles.rememberMeStyle }
              checkedColor={ COLORS.BLUE }
            />
            {/* <ReactElements.Button
              title="Forgot Passwort?"
              textStyle={styles.forgotPassStyle}
              backgroundColor="transparent"
              buttonStyle={styles.forgotPasswdStyle}
            /> */}
          </View>
        </View>
        <View style={styles.bottom}>
          {
            error ? 
            <View style={ styles.error }>
              <Text style={ styles.errorText }>{ error }</Text>
            </View> : null
          }
          <View style={{flex: 3}}>
            <ReactElements.Button
              large
              title="SIGN IN"
              borderRadius={4}
              disabled={ !this.signIn }
              backgroundColor={ COLORS.BLUE }
              textStyle={ styles.signInButtonText }
              buttonStyle={ styles.signInButton }
              onPress={ () => this.tryLogin() }
            />
          </View>
          <View style={ { flex: 1, marginTop: 10 } }>
            <Text style={ styles.signUpText }>Don't have an account?</Text>
            <ReactElements.Button
              title="SIGN UP"
              backgroundColor="transparent"
              textStyle={ styles.signUpButtonText }
              onPress={ () => this.props.navigation.navigate('RegisterForm') }
              buttonStyle={ styles.buttonStyle }
            />
          </View>
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
    overflow: 'hidden',
  },
  top: {
    // flex: 3,
    height: Screen.height * (3/5),
    justifyContent: 'center',
    paddingTop: 50,
    width: '90%',
  },
  ImageContainerStyle: {
    flex: 4,
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
  loginOptionStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeStyle: {
    height: 20,
    padding: 0,
    backgroundColor: 'transparent',
  },
  rememberMeTextStyle: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#b6b6b6',
  },
  forgotPassStyle: {
    color: '#287af4',
    fontSize: 14,
  },
  forgotPasswdStyle: {
    padding: 0,
    margin: 0,
    marginTop: 3,
    marginRight: -15,
  },
  bottom: {
    // flex: 2,
    height: Screen.height * (2/5),
    width: '90%',
    position: 'relative',
    paddingBottom: 20,
  },
  signInButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
  signInButton: {
    margin: 0,
    marginTop: 40,
    marginLeft: -15,
    marginRight: -15,
    height: 55,
  },
  buttonStyle: {
    margin: 0,
    padding: 0,
    marginTop: 10,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#c7c7c7',
  },
  signUpButtonText: {
    color: '#2078f5',
    fontWeight: 'bold',
  },
  error: {
    backgroundColor: '#F25656',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
});
