import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, Text} from 'react-native';
import Button from './components/Button';
import Header from './components/Header';
import CardItem from './components/CardItem';
import GridItem from './components/GridItem';
import { Actions } from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import QrCodeFooter from './components/QrCodeFooter';

export default class Home extends Component{

  componentWillMount(){
    Snackbar.show({
      title: 'Device need authorization',
      duration: Snackbar.LENGTH_SHORT,
    });
    
  }
    render(){
        return(
            <View style={styles.container}>
            <ScrollView>
            <Header style={styles.contentContainer}>
            </Header>
            <View>
            <CardItem style={styles.containerStyle}>
            <Text style={styles.textContainer}>Device Needs Authorization</Text>
            <Text style={styles.titleContainer}>• Go to personal menu</Text>
            <Text style={styles.titleContainer}>• Select the option 'Change Password'</Text>
            <Text style={styles.titleContainer}>• Scan the qr code</Text>
            <View style={styles.gridContainer}>
            <GridItem  colorCode="#676767"  imageName='web' highlightColor="#dddddd"  onPress={() => Actions.webPage({webUrl:"https://www.google.com"})}></GridItem>
            <GridItem  colorCode="#f50a0a" imageName='forward' highlightColor="#dddddd" onPress={() => Actions.scannerPage()}></GridItem>
            </View>
            </CardItem>
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
    },
    titleContainer: {
      marginLeft: 60,
      alignSelf: "stretch",


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
  