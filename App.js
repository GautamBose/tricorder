/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView } from 'react-native';
// import { VisionCamera } from "react-native-vision";
import { RNVCameraView, RNVisionProvider, RNVDefaultRegion, RNVRegion, FacesProvider, FacesConsumer, Faces } from "react-native-vision"
import { dog_list } from './util';


import { whileStatement, objectExpression, assignmentExpression } from '@babel/types';
import { getImageDimensions } from 'react-native-vision/module';
import SlidingUpPanel from 'rn-sliding-up-panel';

const dimensions = Dimensions.get('window');

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
    this.images = [];
  }

  state = {
    shouldCaptureFrame: null,

  }

  onButtonPress = () => {
    this.setState({ shouldCaptureFrame: this.frameCapture });
  };

  frameCapture = (urlToImage) => {
    this.setState({ shouldCaptureFrame: null });
    console.log("Hi"); 
    this.images.push(urlToImage); // possibly add require to this. 
    console.log(this.images); 
    
  }

  render() {
    console.log("HI");
    return (
      <FacesProvider 
        isStarted={true}
        isCameraFront={true}
        classifier={null}>

        <FacesConsumer>
          {({faces}) => 
            <Faces {...faces}>
              {({style}) => {
                  console.log("Hi"); 
                }
              }
            </Faces>
          }
        </FacesConsumer>
      </FacesProvider>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "black",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  galleryButton: {
    width: 40,
    height: 32,
    marginLeft: 30,
    marginRight: 72,


  },
  noCamera: {
    width: 70,
    height: 70,
  },
  foodBlock: {
    padding: 5,
    marginBottom: 4,
    borderRadius: 70,
    fontSize: 20,

    textAlign: "center",
    backgroundColor: "white",
    color: "#ccc",
  },
  canTakeBlock: {
    padding: 5,

    borderRadius: 70,
    fontSize: 20,

    textAlign: "center",
    backgroundColor: "#67ea5d",
    color: "#ccc",
  },
  dogButton: {
    width: 70,
    height: 70,
  },
  camera: {
    flex: 1,
    // borderWidth: 2,
    borderColor: "#fee",
    backgroundColor: "#111",
    // overflow: "hidden",
  },
  cameraContainer: {
    height: "72%",
  },
  topBar: {
    width: dimensions.width,
    height: 45,
    marginTop: 35
  },
  galleryImageContainer: {
    // width: 75,
    // height: 85,
    display: 'flex',
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  },
  controlsContainers: {
    backgroundColor: 'black',
    height: 150,
    display: "flex",
    flexDirection: 'row',

    alignItems: "center",

  }
})
