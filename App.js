/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
// import { VisionCamera } from "react-native-vision";
import { RNVCameraView, RNVisionProvider, RNVDefaultRegion, RNVRegion } from "react-native-vision"

import { whileStatement, objectExpression } from '@babel/types';






const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.modelURL = 'MobileNet.mlmodelc';
  }

  state = {
    shouldCaptureFrame: null
  }


  onButtonPress = () => {
    this.setState({shouldCaptureFrame: this.frameCapture}); 
    console.log("button PRess");
  };

  frameCapture = (urlToImage) => {
    console.log(urlToImage);
    this.setState({shouldCaptureFrame: null}); 

  }

  render() {

    return (
      <RNVisionProvider isCameraFront={false} isStarted>
        <RNVRegion region="" classifiers={[{url: 'MobileNet.mlmodelc', max:5}]}
        onFrameCaptured={this.state.shouldCaptureFrame}>
          {({ label, confidence }) => {
            {/* console.log(label); */}
            return (
              <SafeAreaView style={styles.container}>
                <Text style={styles.welcome}>Food 101</Text>
                <Text style={styles.explainer}>Point the camera at some food!</Text>
                <View style={styles.cameraContainer}>
                  <RNVCameraView gravity="fill" style={styles.camera} />
                </View>
                <TouchableOpacity onPress={this.onButtonPress}style={styles.foodBlock}>
                  <Text>Touch Here</Text>
                </TouchableOpacity>
              </SafeAreaView>
            )
          }}
        </RNVRegion>
      </RNVisionProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  explainer: {
    alignSelf: "stretch",
    textAlign: "center",
    width: "100%",
  },
  foodBlock: {
    padding: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#333",
    color: "#ccc",
  },
  camera: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#fee",
    backgroundColor: "#111",
    overflow: "hidden",
  },
  cameraContainer: {
    height: "80%",
  },
})