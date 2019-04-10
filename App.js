/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { VisionCamera } from "react-native-vision";
import { whileStatement, objectExpression } from '@babel/types';





const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  onButtonPress = () => {
    
  
  };

  render() {
    // console.log("andrew");


    return (
      // <Image 
      // source={require('/private/var/mobile/Containers/Data/Application/71BC002D-AC77-4828-A880-2D037D7B4755/tmp/ReactNative/F927B8C3-6864-470E-B4C8-ADBC0CC95663.jpg')}
      // />
        <VisionCamera style={{ flex: 1 }} classifier="MobileNet" isCameraFront={false}>

          {(object) => {
            {/* console.log(object);  */ }
            return (
              /*            <Text
                            style={{
                              width: "75%",
                              fontSize: 50,
                              position: "absolute",
                              right: 50,
                              bottom: 100,
                              color: "white",
                            }}
                          >
                            {object.label + " :" + (object.confidence * 100).toFixed(0) + "%"}
                          </Text> */

              <TouchableOpacity
              style={{
                              width: "75%",
                              fontSize: 50,
                              position: "absolute",
                              right: 50,
                              bottom: 100,
                              color: "white",
                            }}
                onPress={this.onButtonPress}>
                <Text> Take Photo </Text>
              </TouchableOpacity>


            )
          }}
        </VisionCamera>
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
