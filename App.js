import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {StatusBar} from 'react-native'
import Navigator from './src/Navigator';

export default class MoveXY extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#d84315" translucent = {true}/>
        <Navigator/>
      </NavigationContainer>
    );
  }
}
