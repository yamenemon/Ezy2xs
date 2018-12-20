import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View,Alert,Dimensions,NetInfo} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { Actions } from 'react-native-router-flux';
import Header from './components/Header';
import GridItem from './components/GridItem';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Snackbar from 'react-native-snackbar';
import RNExitApp from 'react-native-exit-app';
import { sha256 } from 'react-native-sha256';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ratio = SCREEN_HEIGHT/SCREEN_WIDTH;
export default class HelpPage extends Component{
    
    state = {
        domainName:"",
        progressVisible:false,
        baseUrl:""

    }
    componentWillMount(){
        DefaultPreference.get('baseUrl').then((value) => this.setState({baseUrl:value})
        );
        DefaultPreference.get('domainName').then((value) => this.setState({domainName:value}));
    }

    urlForAppLogOut() {
        const data = {
            salt:this.state.salt,
            code:this.state.code
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
          return this.state.baseUrl + "api.public.delAuthApp?" + querystring;
      }

    performAppLogout(){
        this.setState({progressVisible:true});
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected)
            {
                var randomString = require('random-string');
                var salt = randomString({length: 6});
                console.log('randomString',salt);
                this.setState({salt:salt});
                const authAppendedString = salt + this.state.code;
                console.log('authAppendedString',authAppendedString);
                sha256(authAppendedString).then( hash => {
                    console.log('hash',hash);
                    this.setState({code:hash});
                    const query = this.urlForAppLogOut();
                    this.executeQueryForAppLogout(query,false);
                  })

            }else{
                this.setState({progressVisible:false});
                Snackbar.show({
                  title: "No internet connection",
                  duration: Snackbar.LENGTH_LONG,
                });
            }
          });
    }

    executeQueryForAppLogout(urlString){
        console.log('executeQueryForAppLogout',urlString);
            axios.get(urlString)
            .then(response => this.appLogOut(response)
            );

    }

    appLogOut(response){
        console.log('response',response);
        this.setState({progressVisible:false});
        Actions.pop();
        Actions.main();
    }

    showAlertForLogOutPopup(){
        Alert.alert(
            'Sign Out',
            'Are you sure you want to signout?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => this.performAppLogout()},
            ],
            { cancelable: false }
          )
    }


    

    render(){
        return(
            <View>
                <ProgressDialog 
                    visible={this.state.progressVisible} 
                    message="Please, wait..."
                />  
                <ScrollView>
                <Header domainName={this.state.domainName} isHome={true}/>
                <View style={styles.gridContainer}>
                    <GridItem  colorCode="#676767"  imageName='question-circle' highlightColor="#f4a30b"></GridItem>
                    <GridItem  colorCode="#f50a0a" imageName='sign-out' highlightColor="#676767" onPress={()=>this.showAlertForLogOutPopup()}></GridItem>
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
      justifyContent: 'space-around',
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