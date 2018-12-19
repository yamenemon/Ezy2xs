import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { sha256 } from 'react-native-sha256';
import * as Animatable from "react-native-animatable";
import DefaultPreference from 'react-native-default-preference';
import URLSearchParams from 'url-search-params';
import DeviceInfo from 'react-native-device-info';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Snackbar from 'react-native-snackbar';
import {NetInfo} from 'react-native';
import Orientation from 'react-native-orientation';

import { 
    Platform,
    WebView,
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    TouchableHighlight,
    BackHandler,
    Linking,
    View  } from 'react-native';


   const SCREEN_HEIGHT = Dimensions.get("window").height;
   const SCREEN_WIDTH = Dimensions.get("window").width;
   

export default class Scanner extends Component{
  state = { willReactivate: true,
            preAuth:'',
            udid:'',
             authToken:'',
             progressVisible:false,
             baseUrl:"",
             screen: Dimensions.get('window'),
             isLandscape:false
            };

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

          return this.state.baseUrl+ "api.public.authorizeApp?" +querystring

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
      return this.state.baseUrl+ "api.appLogin?" +querystring
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    Orientation.addOrientationListener(this._orientationDidChange)
    if(SCREEN_WIDTH>SCREEN_HEIGHT)
    {
      this.setState({isLandscape:true});
    }
  }

  componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _orientationDidChange(orientation) {
  }

  handleBackButton = () => {
    Actions.pop();
     return true;
   }   
  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: this.state.isLandscape?SCREEN_HEIGHT * -0.08:SCREEN_WIDTH * -0.08
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  executeQuery(urlString){
    NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected){
          this.setState({progressVisible:true});
          axios.get(urlString)
          .then(response => this.getMagicToken(response));
        }else{
          this.setState({progressVisible:false});
          this.showErrorMessage("No internet connection");
        }
    });

    
  }

  proceedToFingerPrint(response){
    this.setState({progressVisible:false});
    DefaultPreference.set('magic', response.data.MAGIC).then(() => {
      console.log('platform',Platform.OS);
      Platform.OS === 'android' ?Actions.main(): Actions.main();
      console.log('response',response.data);
    });
  }

  performLoginAPI(urlString){
    axios.get(urlString)
    .then(response => this.proceedToFingerPrint(response));
  }

  showErrorMessage(message){
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_SHORT,
    });
    Actions.pop();
  }

  getMagicToken(response){

    console.log('auth',response);

    if(response.status === 200 && response.data.result!="error")
    {
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
    }else{
      this.setState({progressVisible:false});
      this.showErrorMessage("Authorization failed");
    }
  }

  onLayout(){
    this.setState({screen: Dimensions.get('window')});
  }

    render() {
        return(
          <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
          <ProgressDialog 
          visible={this.state.progressVisible} 
          message="Please, wait..."
         />  
            <QRCodeScanner 
            showMarker = {true}
            bottomContent= {<TouchableHighlight style={styles.footerStyle} onPress={(e)=>Actions.pop()}>
                            <Text style={styles.textStyle}>
                              Cancel
                            </Text>
                            </TouchableHighlight>}
            cameraStyle={{ height: Dimensions.get('window').height, marginTop:0 }}
            onRead={(e) =>{
              console.log('QR code scanned!', e);
              const uniqueId = DeviceInfo.getUniqueID();
              console.log('uniqueId',uniqueId);
              this.setState({udid:uniqueId})
              const qrcodeData = String(e.data);
              var b = e.data.split("/");
              const portalUrl = "https://"+b[2];
              DefaultPreference.set("portalUrl",portalUrl).then(() =>{
                
              });
              const baseUrl  = "https://"+b[2]+'/call/'
                  DefaultPreference.set('baseUrl',baseUrl).then(() => {
                    this.setState({baseUrl:baseUrl});
                    if(qrcodeData.includes("preauth")){
                      var urlParams = new URLSearchParams(e.data);
                      var values = urlParams.values();
                        for(value of values) { 
                          if(value.length >= 20)
                          {
                            console.log(value);
                            sha256(value).then( hash => {
                              console.log('hash',hash)
                              this.setState({preAuth:hash})
                              const query =  this.urlForQueryAndPage('iPhone',this.state.preAuth,this.state.udid)
                              console.log('query',query);
                              this.executeQuery(query);
                            })
                          }else{
                            DefaultPreference.set('domainName', value).then(() => {
                            });
                          }
                        }
                      }else{
                        this.showErrorMessage("Authorization failed");
                      }
                  });
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
                      size={this.state.isLandscape?SCREEN_HEIGHT*0.73:SCREEN_WIDTH * 0.73}
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
                        this.state.isLandscape?SCREEN_HEIGHT * -0.54:SCREEN_WIDTH * -0.54
                      )}
                    />
                  </View>
    
                  <View style={styles.leftAndRightOverlay} />
                </View>
    
                <View style={styles.bottomOverlay} />
              </View>
            }
            />  
          </View>
        );
    }
}


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

// const rectDimensions =this.state.isLandscape?SCREEN_HEIGHT * 0.65:SCREEN_WIDTH * 0.65;
//  // this is equivalent to 255 from a 393 device width
// const rectBorderWidth = this.state.isLandscape?SCREEN_HEIGHT * 0.005:SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
// const rectBorderColor = "red";

// const scanBarWidth = this.state.isLandscape?SCREEN_HEIGHT*0.46:SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
// const scanBarHeight = this.state.isLandscape?SCREEN_HEIGHT * 0.0025:SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",  
  backgroundColor: '#fff',
},
    textStyle:{
        color: '#2196F3',
        marginTop:20
    },
    footerStyle:{
      height: Platform.OS === 'android' ? 160 : 80,
      backgroundColor:'#ddd',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: this.state.isLandscape?SCREEN_HEIGHT * 0.65:SCREEN_WIDTH * 0.65,
    width: this.state.isLandscape?SCREEN_HEIGHT * 0.65:SCREEN_WIDTH * 0.65,
    borderWidth: this.state.isLandscape?SCREEN_HEIGHT * 0.005:SCREEN_WIDTH * 0.005,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height:this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH,
    width: this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH,
    width: this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH * 0.00
  },

  leftAndRightOverlay: {
    height: this.state.isLandscape?SCREEN_HEIGHT*0.65:SCREEN_WIDTH*0.65,
    width: this.state.isLandscape?SCREEN_HEIGHT:SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: this.state.isLandscape?SCREEN_HEIGHT*0.46:SCREEN_WIDTH * 0.46,
    height: this.state.isLandscape?SCREEN_HEIGHT * 0.0025:SCREEN_WIDTH * 0.0025,
    backgroundColor: scanBarColor
  }
};


  
