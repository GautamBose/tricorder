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
import { dog_list } from './util';

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
    this.isDisabled = true;
    this.button = null;
  }

  state = {
    shouldCaptureFrame: null,

  }

  onButtonPress = () => {
    this.setState({ shouldCaptureFrame: this.frameCapture });
  };

  frameCapture = (urlToImage) => {
    this.setState({ shouldCaptureFrame: null });
  }

  render() {

    return (
      <RNVisionProvider isCameraFront={false} isStarted>
        <RNVRegion region="" classifiers={[{ url: 'MobileNet.mlmodelc', max: 5 }]}
          onFrameCaptured={this.state.shouldCaptureFrame}>

          {({ label, confidence }) => {

            if (dog_list.includes(label)) {
              this.isDisabled = false;
              this.button = <TouchableOpacity onPress={this.onButtonPress} style={styles.canTakeBlock} disabled={this.isDisabled}></TouchableOpacity>

            }
            else {
              this.isDisabled = true;
              this.button = <TouchableOpacity onPress={this.onButtonPress} style={styles.foodBlock} disabled={this.isDisabled}></TouchableOpacity>
            }

            return (
              <View style={styles.container}>

                <View style={styles.cameraContainer}>
                  <RNVCameraView gravity="fill" style={styles.camera} />
                </View>

                <View style={styles.controlsContainers}>
                  {this.button}

                </View>
              </View>
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
  foodBlock: {
    padding: 20,
    marginBottom: 145,
    borderRadius: 70,
    fontSize: 20,

    textAlign: "center",
    backgroundColor: "white",
    color: "#ccc",
  },
  canTakeBlock: {
    padding: 20,
    marginBottom: 145,
    borderRadius: 70,
    fontSize: 20,

    textAlign: "center",
    backgroundColor: "green",
    color: "#ccc",
  },
  camera: {
    flex: 1,
    // borderWidth: 2,
    borderColor: "#fee",
    backgroundColor: "#111",
    // overflow: "hidden",
  },
  cameraContainer: {
    height: "83%",
  },
  controlsContainers: {
    backgroundColor: 'red',
    height: 300,
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",

  }
})