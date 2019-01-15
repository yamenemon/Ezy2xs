import React, {Component} from 'react';
import { View,Text, TouchableOpacity, Image, Platform,Dimensions } from 'react-native';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ratio = SCREEN_HEIGHT/SCREEN_WIDTH;
const Header =  (props) =>{
    return(
        <View style={styles.container}> 
                 <TouchableOpacity style={styles.logOut} onPress={props.onPressExit}>
                    <Image source={props.logoutIconName}></Image>
                </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Image 
                style={styles.logo}
                source={require('./logo-app.png')} >
                </Image>
                <Text style={styles.textContainer}>{props.domainName}</Text>
            </View>
            <TouchableOpacity style={styles.logOut} onPress={props.onPress}>
                    <Image source={props.tvIconName}></Image>
                </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
      flexDirection: 'row',  
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#f4a30b',
      flex: Platform.isPad||ratio<=1.6?0.5:0.4,
      height:Platform.isPad||ratio<=1.6?250:200
    },
    logOut: {
        padding:30
      },
    contentContainer: {
        marginTop:80,
        justifyContent: 'flex-end',
      },
    textContainer: {
        marginTop: 25,
        alignSelf:'center',
        fontSize: Platform.isPad||ratio<=1.6?20:14
    },
    logo: {
      width: Platform.isPad||ratio<=1.6?150:100,
      height: Platform.isPad||ratio<=1.6?150:100,
    },
  };

  export default Header;