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
import { RNVCameraView, RNVisionProvider, RNVDefaultRegion, RNVRegion } from "react-native-vision"
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

    return (

      <RNVisionProvider isCameraFront={false} isStarted>
        {/* Here we provide a region of the frame and an array of classifiers to run on that region */}
        <RNVRegion region="" classifiers={[{ url: 'MobileNet.mlmodelc', max: 5 }]}
          onFrameCaptured={this.state.shouldCaptureFrame}>
          {/* These instance variables get updated with the results of that classifier */}
          {({ label, confidence }) => {
            {/* console.log(confidence);  */ }
            if (dog_list.includes(label) && confidence > 0.2) {
              this.isDisabled = false;
              this.button = <TouchableOpacity onPress={this.onButtonPress} style={styles.canTakeBlock} disabled={this.isDisabled}>
                <Image style={styles.dogButton} source={require('./assets/dogButton.png')} />
              </TouchableOpacity>

            }
            else {
              this.isDisabled = true;
              this.button = <TouchableOpacity onPress={this.onButtonPress} style={styles.foodBlock} disabled={this.isDisabled}>
                <Image style={styles.noCamera} source={require('./assets/noCamera.png')} />
              </TouchableOpacity>
            }

            return (
              <View style={styles.container}>
                <Image source={require('./assets/IMG_6006.png')} style={styles.topBar}></Image>
                <View style={styles.cameraContainer}>
                  <RNVCameraView gravity="fill" style={styles.camera} />
                </View>
                <View>

                </View>
                <View style={styles.controlsContainers}>

                  <TouchableOpacity onPress={() => this._panel.show()}>
                    <Image style={styles.galleryButton} source={require('./assets/gallery.png')} />
                  </TouchableOpacity>
                  {this.button}
                </View>

                <SlidingUpPanel ref={c => this._panel = c}>
                  {dragHandler => (
                    <SafeAreaView>
                      <View style={styles.container}>
                        <View style={styles.dragHandler} {...dragHandler}>
                          <Text style={{ color: '#daa250', fontSize: 30, marginBottom: 10 }}>Gallery</Text>
                        </View>
                        <ScrollView style={{ height: '100%' }}>
                         
                          {this.images.map( (fileURL) => (
                            <View style={styles.galleryImageContainer} key={fileURL.fileURL}>
                              <Image style={{width: 300, height: 300}}source={{uri: fileURL.fileURL}}/>
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </SafeAreaView>
                  )}
                </SlidingUpPanel>
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