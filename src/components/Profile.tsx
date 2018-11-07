import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IAppState } from '../reducers';

const ReactElements = require('react-native-elements');
const { connect } = require('react-redux');
const { MarkdownView } = require('react-native-markdown-view');

import ProfileVideo from './ProfileVideo';
import { ArrowBack, ViewHeader } from './common';
import { getProfile, clearProfile } from '../actions';
import { ICONS } from './common';

@connect(
  (state: IAppState) => {
    const { profile } = state;
    return { profile }
  }, { getProfile, clearProfile },
)
export default class Profile extends React.Component<any, any> {
  public static navigationOptions = ({navigation}: any) => {
    return({
      title: <ViewHeader title="Profile" bold/>,
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
  }

  public componentWillUnmount() {
    this.props.clearProfile();
  }

  private renderVideos = () => {
    const {videos} = this.props.profile;
    return videos.map((video: any, index: number) => {
      const title = Object.keys(video)[0];
      const videoURL = video[title]
      return (
        <ProfileVideo title={title} video={videoURL} key={index}/>
      );
    });
  }

  private renderSkills = () => {
    const { skills } = this.props.profile;
    return (
      skills.map((skill: string, index: number) => (
        <View style={styles.skillBucketStyle} key={index}>
          <Text style={styles.skillTextStyle}>{skill}</Text>
        </View>
      ))
    )
  }

  private renderStars = () => {
    const { rating } = this.props.profile;
    const array = [];
    let i = 0;
    while (i < Math.ceil(rating) && i < 5) {
      array.push(i);
      i++;
    }
    return (
      array.map((item, index) => {
        if (index < Math.floor(rating)) {
          return (
            <View key={`${index}`}>
              <ReactElements.Icon
              name="star"
              color="#12cf6e"
              type="material"
              size={35}
              containerStyle={styles.starStyle}
              />
            </View>
          );
        }
        else if (rating - Math.floor(rating) > 0) {
          const width = 29 * (1 - (rating - Math.floor(rating)));
          return (
            <View key={`${index}`}>
              <ReactElements.Icon
              name="star"
              color="#12cf6e"
              type="material"
              size={35}
              containerStyle={styles.starStyle}
              />
              <View style={[styles.starCover, {width: width}]}></View>
            </View>
          );
        }
      })
    );
  }

  private renderMarkdown = () => {
    const { description } = this.props.profile;
    if (!description) {
      return null;
    }
    return (
      <MarkdownView styles={markdownStyle}>{description}</MarkdownView>
    )
  }

  public render() {
    const { profile } = this.props;
    console.log('profile: ', profile);
    if (profile && profile.name !== '') {
      return(
        <View style={ styles.container }>
          <ScrollView style={ styles.scrollStyle } bounces={ false }>
            <View style={ styles.top }>
              <View style={ styles.imageContainerStyle }>
                <Image
                  style={ styles.profileImageStyle }
                  source={ { uri: profile.image } }
                />
              </View>
              <View style={ styles.userInfoStyle }>
                <Text style={ [styles.userInfoTextStyle, styles.usernameStyle] }>{ profile.username }</Text>
                <Text style={ [styles.userInfoTextStyle] }>{ profile.position }</Text>
                <Text style={ [styles.userInfoTextStyle] }>{ profile.company }</Text>
              </View>
              <View style={ styles.userContact }>
                <TouchableOpacity style={ styles.contactIconWrapper }>
                  <Image
                    source={ ICONS.message_icon }
                    style={ styles.contactIcon }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.contactIconWrapper }>
                  <Image
                    source={ ICONS.phone }
                    style={ styles.contactIcon }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={ styles.contactIconWrapper }>
                  <Image
                    source={ ICONS.facetime }
                    style={ [styles.contactIcon, { height: 13 }] }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={ styles.bottom }>
              <View style={ [styles.ratingContainerStyle, styles.bottomShelf] }>
                <Text style={ styles.headerText }>Rating</Text>
                <View style={ styles.ratingStyle }>
                  <View style={ { width: 50 } }>
                    <Text style={ [styles.headerText, {fontSize: 22}] }>{ profile.rating }</Text>
                  </View>
                  <View style={ { flexDirection: 'row' } }>
                    { this.renderStars() }
                  </View>
                </View>
              </View>
              <View style={ [styles.bottomShelf] }>
                <Text style={ styles.headerText }>Skills</Text>
                <View style={ styles.skillsContainerStyle }>
                  { this.renderSkills() }
                </View>
              </View>
              <View style={ [styles.descriptionContainerStyle, styles.bottomShelf] }>
                { this.renderMarkdown() }
              </View>
              {
                profile.videos.length ?
                <View style={ [styles.videosContainerStyle, styles.bottomShelf] }>
                  <Text style={styles.headerText}>Videos</Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={ false }
                    showsVerticalScrollIndicator={ false }
                  >
                    { this.renderVideos() }
                  </ScrollView>
                </View> : null
              }
            </View>
          </ScrollView>
        </View>
      );
    }
    else {
      return null;
    }
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
  modalStyle: {
    width: '100%',
    height: '100%',
    zIndex: 9000,
    backgroundColor: '#fff',
    opacity: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalVideoContainer: {
    width: '90%',
    height: 250,
    backgroundColor: '#ddd',
    zIndex: 9001,
    elevation: 5,
  },
  modalVideoStyle: {
    width: '100%',
  },
  scrollStyle: {
    width: '100%',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    width: '100%',
    paddingTop: 30,
    height: 320,
    backgroundColor: '#2077f5',
  },
  imageContainerStyle: {

  },
  profileImageStyle: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  userInfoStyle: {

  },
  userContact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  contactIconWrapper: {
    backgroundColor: '#1066e4',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  contactIcon: {
    width: 18,
    height: 18,
  },
  usernameStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  userInfoTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  bottom: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  bottomShelf: {
    marginBottom: 20,
  },
  ratingContainerStyle: {
    
  },
  ratingStyle: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 5,
  },
  starStyle: {
    marginTop: -5,
  },
  starCover: {
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -5,
    right: 3,
  },
  skillsContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBucketStyle: {
    backgroundColor: '#2077f5',
    height: 18,
    borderRadius: 9,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillTextStyle: {
    color: '#fff',
    fontSize: 11,
  },
  descriptionContainerStyle: {
    
  },
  videosContainerStyle: {
    
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#434343',
    marginBottom: 5,
  },
  mainTextStyle: {
    color: '#838383',
  },
});

const markdownStyle = {
  heading: {
    fontWeight: 'bold',
    color: '#434343',
    margin: 0,
    marginBottom: 5,
  },
  paragraph: {
    marginTop: 0,
    color: '#838383',
    marginBottom: 20,
  },
  heading1: {
    marginTop: 0,
    marginBottom: 5,
  },
  heading2: {
    marginTop: 0,
    marginBottom: 5,
  },
  heading3: {
    marginTop: 0,
    marginBottom: 5,
  },
  heading4: {
    marginTop: 0,
    marginBottom: 5,
  },
  heading5: {
    marginTop: 0,
    marginBottom: 5,
  },
  heading6: {
    marginTop: 0,
    marginBottom: 5,
  },
}
