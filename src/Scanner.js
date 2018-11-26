import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { sha256 } from 'react-native-sha256';
import * as Animatable from "react-native-animatable";
import DefaultPreference from 'react-native-default-preference';

import { WebView,
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    TouchableHighlight,
    Button,
    Linking,
    View  } from 'react-native';


   const SCREEN_HEIGHT = Dimensions.get("window").height;
   const SCREEN_WIDTH = Dimensions.get("window").width;
   

export default class Scanner extends Component{
  state = { willReactivate: true,
            preAuth:'',
            udid:'',
             authToken:''};

  urlForQueryAndPage(deviceName,preAuth,udid) {

    const data = {
      preauth:preAuth,
      UDID:udid,
      devicename:deviceName,
    };
    // data[key] = value;
    const querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');
    return 'https://dev-pradeep.ez2xs.com/call/api.public.authorizeApp?' + querystring;
  }

  urlForLogin(saltString) {

    const data = {
      salt:saltString,
      auth:this.state.authToken
    };
    // data[key] = value;
    const querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');
    return 'https://dev-pradeep.ez2xs.com/call/api.appLogin?' + querystring;
  }

  componentWillUnmount(){
      // this.setState({willReactivate: false});


  }
  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.08
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  executeQuery(urlString){
    axios.get(urlString)
    .then(response => this.getMagicToken(response));
    
  }

  proceedToFingerPrint(response){
    DefaultPreference.set('magic', response.data.MAGIC).then(() => {console.log('done')});
    console.log('response',response.data);
    Actions.fingerPrintPage();
  }

  performLoginAPI(urlString){
    axios.get(urlString)
    .then(response => this.proceedToFingerPrint(response));
  }

  getMagicToken(response){
    console.log('auth',response.data.auth);
    this.setState({ authToken: response.data.auth });
    var randomString = require('random-string');
    var salt = randomString({length: 6});
    const authAppendedString = salt + this.state.authToken;
    console.log('authAppendedString',authAppendedString);

    sha256(authAppendedString).then( hash => {
      console.log('hash',hash);
      this.setState({authToken:hash});
      const loginQuery = this.urlForLogin(salt);
      console.log('loginquery',loginQuery);
      this.performLoginAPI(loginQuery);
    })

  }
    render() {
        return(
            <QRCodeScanner 
            reactivate = {this.state.willReactivate}
            reactivateTimeout = {5000}
            showMarker = {true}
            bottomContent= {<TouchableHighlight onPress={(e)=>Actions.pop()}>
                            <Text style={styles.textStyle}>
                              Cancel
                            </Text>
                            </TouchableHighlight>}
            cameraStyle={{ height: Dimensions.get('window').height -64, marginTop:0 }}
            onRead={(e) =>{
              var DeviceUUID = require("react-native-device-uuid");
              DeviceUUID.getUUID().then((uuid) => {
              console.log('uuid',uuid);
              this.setState({udid:uuid})
              const query = this.urlForQueryAndPage('iPhone',this.state.preAuth,this.state.udid)
              console.log('query',query);
              this.executeQuery(query);
              });
              console.log('QR code scanned!', e);
        
              var urlParams = new URLSearchParams(e.data);
              var values = urlParams.values();
                for(value of values) { 
                  console.log(value);
                  sha256(value).then( hash => {
                    console.log('hash',hash)
                    this.setState({preAuth:hash})
                  })

                }


              }
            }
            customMarker={
              <View style={styles.rectangleContainer}>
                <View style={styles.topOverlay}>
                </View>
    
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.leftAndRightOverlay} />
    
                  <View style={styles.rectangle}>
                    <Icon
                      name="ios-qr-scanner"
                      size={SCREEN_WIDTH * 0.73}
                      color={iconScanColor}
                    />
                    <Animatable.View
                      style={styles.scanBar}
                      direction="alternate-reverse"
                      iterationCount="infinite"
                      duration={1700}
                      easing="linear"
                      animation={this.makeSlideOutTranslation(
                        "translateY",
                        SCREEN_WIDTH * -0.54
                      )}
                    />
                  </View>
    
                  <View style={styles.leftAndRightOverlay} />
                </View>
    
                <View style={styles.bottomOverlay} />
              </View>
            }
    
          //   onRead={(e) =>{
          //     console.log('QR code scanned!', e);
              
          // }}

            />  
        );
    }
}


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
    textStyle:{
        color: '#2196F3'
    },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};


  
