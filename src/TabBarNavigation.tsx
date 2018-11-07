import * as React from 'react';
import {
  addNavigationHelpers, StackNavigator, TabBarBottom,
  TabNavigator,
} from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Chat from './components/Chat';
import Directory from './components/Directory';
import LoadingScreen from './components/LoadingScreen';
import LoginForm from './components/LoginForm';
import ChannelList from './components/ChannelList';
import RegisterForm from './components/RegisterForm';
import Team from './components/Team';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { IAppState } from './reducers';
import CustomIcon from './components/common/CustomIcon';
import NewMessage from './components/NewMessageRecipients';
import EditProfile from './components/EditProfile';

export const COLORS = {
  BLUE: '#2077F5',
  GRAY: '#C6C6C6',
  WHITE: '#FFF',
  GREEN: '#12CF6E',
}

const navigationOptions = {
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: COLORS.BLUE,
    borderBottomWidth: 0,
    borderWidth: 0,
  },
  headerTitleStyle: {
    color: COLORS.WHITE,
  },
};

const TeamNav = StackNavigator({
  TeamView: { screen: Team },
  Profile: { screen: Profile },
}, {
  navigationOptions: { ...navigationOptions },
});

const Channels = StackNavigator({
  ChannelList: { screen: ChannelList },
  Chat: { screen: Chat, navigationOptions: { tabBarVisible: false  } },
  Settings: { screen: Settings },
  EditProfile: { screen: EditProfile, navigationOptions: { tabBarVisible: false  } },
  // ChangePassword: { screen: ChangePassword, navigationOptions: { tabBarVisible: false  } },
  NewMessage: { screen: NewMessage, navigationOptions: { tabBarVisible: false  } },
}, {
  navigationOptions: {...navigationOptions},
});

const Directories = StackNavigator({
  Files: { screen: Directory },
}, {
  navigationOptions: { ...navigationOptions },
});

const TabBar = TabNavigator({
  Team: { screen: TeamNav, navigationOptions: () =>  ({
    tabBarIcon: ({tintColor}: any) => (
      <View>
        <CustomIcon
          name="team_icon"
          size={30}
          color={tintColor}
        />
      </View>
    )
  })},
  Channels: { screen: Channels },
  Directory: { screen: Directories, navigationOptions: () => ({
    tabBarIcon: ({tintColor}: any) => (
      <View>
        <CustomIcon
          name="file_icon"
          size={30}
          color={tintColor}
        />
      </View>
    )
  })},
}, {
  animationEnabled: false,
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Channels',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: COLORS.BLUE,
    inactiveTintColor: COLORS.GRAY,
    activeBackgroundColor: COLORS.WHITE,
    inactiveBackgroundColor: COLORS.WHITE,
    showLabel: false,
  },
});

const BaseRouter = StackNavigator({
  Login: { screen: LoginForm },
  Loading: { screen: LoadingScreen },
  RegisterForm: { screen: RegisterForm },
  MainScreen: { screen: TabBar },
}, {
  headerMode: 'none',
  initialRouteName: 'Login',
});

class TabBarNavigation extends React.Component<any, IAppState> {
  public componentDidMount() {
    (console as any).disableYellowBox = true;
  }

  public render() {
    const {dispatch, navigationState} = this.props;
    return (
      <BaseRouter
        navigation={addNavigationHelpers({dispatch, state: navigationState})
        }
      />
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    navigationState: state.baseRouting,
  };
};

export { BaseRouter };
export { TabBar };
export default connect(mapStateToProps)(TabBarNavigation);
