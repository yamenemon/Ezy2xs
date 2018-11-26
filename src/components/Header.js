import React, {Component} from 'react';
import { View,Text, TouchableOpacity, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';

const Header =  (props) =>{
    return(
        <View style={styles.container}> 
                 <TouchableOpacity style={styles.logOut} onPress={()=>Actions.auth()}>
                    <Image source={props.logoutIconName}></Image>
                </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Image 
                style={styles.logo}
                source={require('./logo-app.png')} >
                </Image>
                <Text style={styles.textContainer}>ez2xs.ez2xs.com</Text>
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
      flex: 0.4,
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
    },
    logo: {
      width: 100,
      height: 100,
    },
  };

  export default Header;