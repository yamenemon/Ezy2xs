import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, Text} from 'react-native';
import Button from './components/Button';
import Header from './components/Header';
import CardItem from './components/CardItem';
import GridItem from './components/GridItem';
import { Actions } from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import {Icons,parseIconName} from 'react-native-fontawesome';
import ActionSheet from 'react-native-actionsheet'


export default class Home extends Component{

  componentWillMount(){
    Snackbar.show({
      title: 'Device needs authorization',
      duration: Snackbar.LENGTH_SHORT,
    });
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
            <Header>
            </Header>
            <View>
            <CardItem style={styles.containerStyle}>
            <Text style={styles.textContainer}>Device needs authorization</Text>
            <Text style={styles.titleContainer}>• Go to personal menu</Text>
            <Text style={styles.titleContainer}>• Select the option 'Change Password'</Text>
            <Text style={styles.titleContainer}>• Scan the qr-code</Text>
            <View style={styles.gridContainer}>
            <GridItem  colorCode="#676767"  imageName='newspaper-o' highlightColor="#dddddd"  onPress={() => Actions.webPage({webUrl:"https://dev-pradeep.ez2xs.com/n/#release"})}></GridItem>
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
  