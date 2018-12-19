import React, {Component} from 'react';
import {Platform, StyleSheet, BackAndroid, View,Dimensions,NetInfo} from 'react-native';
import { SuperGridSectionList, GridView  } from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Snackbar from 'react-native-snackbar';
import RNExitApp from 'react-native-exit-app';
import { sha256 } from 'react-native-sha256';

import { 
    parseIconFromClassName 
  } from 'react-native-fontawesome';
  

import GridItem from './components/GridItem';
import Header from './components/Header';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ratio = SCREEN_HEIGHT/SCREEN_WIDTH;
class GridMenu extends Component {

    state = { magic:'',
             progressVisible:false,
             portalItems: [{ naam: 'Release', code: '#676767', link:"https://ez2xs.ez2xs.com/portal/release", icon:"newspaper-o", highlightColor:"#f4a30b" },{ naam: 'Qrcodescan', code: '#f4a30b',icon:"qrcode",link:"",highlightColor:"#f4a30b"  },{ naam: 'Help', code: '#676767', icon:"question-circle",link:"",highlightColor:"#f4a30b"  }],
             domainName: "",
             isHelpPressed: false,
             baseUrl:"",
             portalUrl:"",
             salt:"",
             code:""
            };
    
    componentWillMount() {
        const strInputCode = "<i class=\"fa fa-folder-open\"></i>"
        const cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        console.log("validIcon",cleanText);
        this.setState({progressVisible:true});
        DefaultPreference.get('baseUrl').then((value) => this.setState({baseUrl:value})
        );
        DefaultPreference.get('magic').then((value) => this.fetchPortalItems(value));
        DefaultPreference.get('domainName').then((value) => this.setState({domainName:value}));
        DefaultPreference.get('portalUrl').then((value) => this.setState({portalUrl:value})
        );
        DefaultPreference.get('code').then((value) => this.setState({code:value})
        );
    }

    fetchPortalItems(value){
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected)
            {
                this.setState({magic:value});
                const query = this.urlToFetchPortalItems();
                console.log("urlToFetchPortalItems",query);
                this.executeQuery(query,true);
            }else{
                Snackbar.show({
                  title: "No internet connection",
                  duration: Snackbar.LENGTH_LONG,
                });
                this.setState({progressVisible:false});
            }
          });
          

    }

    urlForLogOut() {
        const data = {
            MAGIC:this.state.magic
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
          return this.state.baseUrl + "api.logoutAll?" + querystring;
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

      urlToFetchPortalItems() {
        const data = {
            MAGIC:this.state.magic
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
          return this.state.baseUrl + "api.getMedewerkerInfo?" + querystring;
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

    performLogOut(){

        this.setState({progressVisible:true});
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected)
            {
                const query = this.urlForLogOut();
                this.executeQuery(query,false);
            }else{
                this.setState({progressVisible:false});
                Snackbar.show({
                  title: "No internet connection",
                  duration: Snackbar.LENGTH_LONG,
                });
            }
          });

    }
    

    executeQuery(urlString,isFetchPortal){
        console.log('isFetchPortal',isFetchPortal,urlString);

        if(isFetchPortal)
        {
            axios.get(urlString)
            .then(response => this.finishFetchinPortalItems(response)
            );
        }else{
            axios.get(urlString)
            .then(response => this.logOut(response)
            );
        }
    }

    executeQueryForAppLogout(urlString){
        console.log('executeQueryForAppLogout',urlString);
            axios.get(urlString)
            .then(response => this.appLogOut(response)
            ).catch(
                (error) => this.showErrorMessage("Authorization Failed")
            );

    }

     camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
          return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
        }).replace(/\s+/g, '');
      }
      

      finishFetchinPortalItems(response){
        this.setState({progressVisible:false});
        console.log('response',response.data.nportal);
            var convertedArray = this.json2array(response.data.nportal);
            convertedArray.forEach(element => {
                element.code = "#414141";
                element.highlightColor= "#f4a30b";
               var b = element.icon.split(" ");
               var c = b[2].substr(b[2].indexOf("-")+1);
               if(c.includes("\"></i>")){
                 var d =  c.replace("\"></i>","");
                 element.icon = d;
               }else{
                   element.icon = c;
               } 
               this.state.portalItems.push(element);
            });
            this.state.portalItems.forEach(item => {
                item.naam = this.camelize(item.naam);
            });
            convertedArray = this.state.portalItems.push(convertedArray);
            this.setState({portalItems:this.state.portalItems});
            console.log('portalItems',this.state.portalItems);
    }

    showErrorMessage(message){
        this.setState({progressVisible:false});
        Snackbar.show({
          title: message,
          duration: Snackbar.LENGTH_LONG,
        });
        DefaultPreference.set('magic','').then(function() {console.log('done')});
        Actions.pop();
        Actions.auth();
      }
    

     json2array(json){
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        return result;
    }
    

    appLogOut(response){
        console.log('response',response);
        this.setState({progressVisible:false});
        Actions.pop();
        Actions.main();
    }


    logOut(response){
        console.log('response',response);
        this.setState({progressVisible:false});
        DefaultPreference.set('magic','').then(function() {console.log('done')});
        Actions.pop();
        this.state.isHelpPressed?Actions.auth():RNExitApp.exitApp(); 
    }

    performActionForGridItem(item){
        if(item.item.naam=="Qrcodescan"){
            Actions.scan();
        }else if(item.item.naam=="Help"){
            this.setState({isHelpPressed:true});
            this.performAppLogout();
        }else if(item.item.naam=="Release" && item.item.code=="#676767"){
            Actions.portalPage({webUrl:"https://ez2xs.ez2xs.com/portal/release",title:item.item.naam})

        }else{
            Actions.portalPage({webUrl:this.state.portalUrl+"/n/?MAGIC=" +this.state.magic+"#"+ item.item.link,title:item.item.naam})
        }
    }

    performAppExit(){
        Platform.OS  === 'android' ?BackAndroid.exitApp(): RNExitApp.exitApp();
    }
    
    render(){
        const items = [
            { name: 'TURQUOISE', code: '#676767' }, { name: 'EMERALD', code: '#2ecc71' },
            { name: 'PETER RIVER', code: '#676767' }, { name: 'AMETHYST', code: '#9b59b6' },
            { name: 'WET ASPHALT', code: '#676767' }, { name: 'GREEN SEA', code: '#16a085' },
            { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
            { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
            { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
            { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
            { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
            { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
            { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
          ];
      
        return(
            <View style={styles.container}>
                <ProgressDialog 
                    visible={this.state.progressVisible} 
                    message="Please, wait..."
                />  
          <SuperGridSectionList

            itemDimension={Platform.isPad||ratio<=1.6?200:100}
            sections={[
                {
                title: 'Title1',
                data: this.state.portalItems
                }
            ]}
            style={styles.gridView}
            renderItem={({ item }) => (
                // <GridItem colorCode={item.code} imageName={item.image}  highlightColor={item.highlighColor} webUrlSource="https://www.google.com" onPress={() => Linking.openURL("https://dev-pradeep.ez2xs.com/n/#auditor")}></GridItem>
                <GridItem colorCode={item.code}  imageName={item.icon} highlightColor={item.highlightColor}   onPress={() => this.performActionForGridItem({item})}></GridItem>
                // <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                // <Text style={styles.itemName}>{item.name}</Text>
                // <Text style={styles.itemCode}>{item.code}</Text>
                // </View>
            )}
            renderSectionHeader={({ section }) => (
                <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} onPressExit={()=>this.performAppExit()} onPress={() => this.performLogOut()} domainName={this.state.domainName}></Header>
            )}
            />
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      backgroundColor: '#fff',
    },
    gridView: {
      paddingTop: 0,
      flex: 1,
    },

    sectionHeader:{
        margin:10,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

export default GridMenu;