import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const ReactElements = require('react-native-elements');


const Search = ({ value, onChange }: any) =>  {
  return (
    <View style={styles.searchSection}>
      {
        value === '' ?
        <ReactElements.Icon style={styles.searchIcon} name="search" size={20} color="#7f7f7f"/> : null
      }
      <TextInput
        style={ styles.searchInputStyle }
        onChangeText={ (text) => onChange(text) }
        value={ value }
        placeholder="Search for message" // or user
        placeholderTextColor="#7f7f7f"
        autoCapitalize="none"
        autoCorrect={ false }
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 4,
},
  searchInputStyle: {
    flex: 1,
    backgroundColor: '#efefef',
    padding: 10,
    color: '#7f7f7f',
    fontSize: 14,
    textAlign: 'center',
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 90001,
    left: 60,
  },
});

export default Search;
