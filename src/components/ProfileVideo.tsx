import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

const ReactElements = require('react-native-elements');

export default class ProfileVideo extends React.Component<any, any> {
  player: any;
  timer: any;
  constructor(props: any) {
    super(props)
    this.state = {
      paused: true,
      muted: false,
      started: false,
      controlsOpacity: 0,
    };
  }

  public componentDidUpdate() {
    const { controlsOpacity } = this.state;
    if (controlsOpacity === 0 && this.timer) {
      clearTimeout(this.timer);
    }
    else if (controlsOpacity === 1) {
      this.timer = setTimeout(() => {
        this.setState({controlsOpacity: 0});
      }, 2000);
    }
  }

  private renderMainPlayButton = () => {
    if (this.state.started) {
      return null;
    }
    return (
      <ReactElements.Icon
        name="play-circle-outline"
        color="#fff"
        size={50}
        onPress={() => this.setState({paused: false, controlsOpacity: 1, started: true})}
        containerStyle={styles.mainPlayButtonStyle}
      />
    )
  }

  public render() {
    return (
      <View style={styles.videoContainerStyle}>
        <View style={styles.videoPlayerStyle}>
          <Video
            source={{uri: this.props.video}}
            muted={this.state.muted}
            paused={this.state.paused}
            style={styles.videoStyle}
            resizeMode="contain"
            ref={(ref) => (this.player = ref)}
          />
          <View style={[styles.videoControlsStyle]}>
            <View style={styles.videoControlsBar}>
              <ReactElements.Icon
                name={this.state.paused ? "play-arrow" : "pause"}
                color="#fff"
                size={12}
                onPress={() => this.setState({paused: !this.state.paused})}
                containerStyle={styles.playPauseButtonStyle}
              />
              <ReactElements.Icon
                name={this.state.muted ? "volume-off" : "volume-up"}
                color="#fff"
                size={12}
                onPress={() => this.setState({muted: !this.state.muted})}
                containerStyle={styles.volumeButtonStyle}
              />
              <ReactElements.Icon
                name="fullscreen"
                color="#fff"
                size={12}
                onPress={() => this.player.presentFullscreenPlayer()}
                containerStyle={styles.fullscreenButtonStyle}
              />
            </View>
          </View>
          {this.renderMainPlayButton()}
        </View>
        <View style={styles.videoTitleStyle}>
          <Text style={styles.videoTitleText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoContainerStyle: {
    width: 120,
    height: 90,
    margin: 10,
    marginLeft: 0,
    marginRight: 20,
  },
  videoPlayerStyle: {
    flex: 1,
  },
  videoStyle: {
    zIndex: 1,
    flex: 1,
    height: 70,
  },
  videoControlsStyle: {
    zIndex: 9001,
    position: 'absolute',
    height: 70,
    top: 0,
    width: '100%',
  },
  videoControlsBar: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButtonStyle: {

  },
  volumeButtonStyle: {
    position: 'absolute',
    right: 17,
  },
  fullscreenButtonStyle: {
    position: 'absolute',
    right: 2,
  },
  mainPlayButtonStyle: {
    zIndex: 19005,
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  videoTitleStyle: {
    height: 15,
    marginTop: 5,
  },
  videoTitleText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: '#6d6d6d',
  },
});
