import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, Text,BackHandler,Alert,Dimensions} from 'react-native';
import Button from './components/Button';
import Header from './components/Header';
import CardItem from './components/CardItem';
import GridItem from './components/GridItem';
import { Actions } from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import {Icons,parseIconName} from 'react-native-fontawesome';
import ActionSheet from 'react-native-actionsheet'
import DefaultPreference from 'react-native-default-preference';
import Orientation from 'react-native-orientation';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ratio = SCREEN_HEIGHT/SCREEN_WIDTH;
export default class Home extends Component{
 state = {
    domainName: "",
    orientationMode:""
 }
  componentWillMount(){
    Snackbar.show({
      title: 'Device needs authorization',
      duration: Snackbar.LENGTH_LONG,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    Orientation.addOrientationListener(this._orientationDidChange)
    DefaultPreference.get('domainName').then((value) => this.setState({domainName:value}));

  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  _orientationDidChange(orientation) {
    console.log(orientation)
  }


  handleBackButton = () => {
    console.log("handleBackButton");
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ],{
            cancelable: false
        }
     )
     return true;
   } 
   


  showActionSheet = () => {
    this.ActionSheet.show()
  }

  takeAction(index){
    if(index===0)
    {
      Actions.loginPage();
    }else if(index===1){
      Actions.scan();
    }
  }

    render(){
        return(
            <View style={styles.container}>
            <ScrollView>
            <Header domainName={this.state.domainName} isHome={true}>
            </Header>
            <View>
            <CardItem style={styles.containerStyle}>
            <Text style={styles.textContainer}>Device needs authorization</Text>
            <Text style={styles.titleContainer}>- Go to personal menu</Text>
            <Text style={styles.titleContainer}>- Select the option 'App Access'</Text>
            <Text style={styles.titleContainer}>- Scan the qr-code</Text>
            <View style={styles.gridContainer}>
            <GridItem  colorCode="#676767"  imageName='newspaper-o' highlightColor="#dddddd"  onPress={() => Actions.webPage({webUrl:"https://ez2xs.ez2xs.com/portal/release"})}></GridItem>
            <GridItem  colorCode="#f50a0a" imageName='sign-in' highlightColor="#dddddd" onPress={() => this.showActionSheet()}></GridItem>
            </View>
            </CardItem>
              <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'How do you want to sign in?'}
            options={['Using Credentials', 'Scanning QR Codes', 'cancel']}
            cancelButtonIndex={2}
            onPress={(index) => this.takeAction(index)}
          />
            </View>
            </ScrollView>
          </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      backgroundColor: '#fff',
    },
    textContainer: {
      padding:40,
      fontSize: Platform.isPad||ratio<=1.6?30:14
    },
    titleContainer: {
      marginLeft: Platform.isPad||ratio<=1.6?260:60,
      alignSelf: "stretch",
      fontSize: Platform.isPad||ratio<=1.6?30:14
    },
    containerStyle: {
      alignItems: 'stretch',
    },

    gridContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: 'space-evenly',
      alignSelf: "stretch",
      marginTop:50,
      marginBottom:100,
      marginLeft:40,
      marginRight:40,

  },

    image: {
      height: null,
      width: null,
      resizeMode: 'contain'
    },
  
    buttonStyle: {
        height: 44,
        marginTop: 10,
    },

    welcome: {
      fontSize: 20,
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  