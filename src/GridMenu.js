import React, {Component} from 'react';
import {Platform, StyleSheet, BackAndroid, View} from 'react-native';
import { SuperGridSectionList, GridView  } from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Snackbar from 'react-native-snackbar';

import { 
    parseIconFromClassName 
  } from 'react-native-fontawesome';
  

import GridItem from './components/GridItem';
import Header from './components/Header';
class GridMenu extends Component {

    state = { magic:'',
             progressVisible:false,
             portalItems: [{ naam: 'release', code: '#676767', link:"", icon:"newspaper-o", highlightColor:"#f4a30b" },{ naam: 'qrcodescan', code: '#676767',icon:"qrcode",link:"",highlightColor:"#f4a30b"  },{ naam: 'help', code: '#676767', icon:"question-circle",link:"",highlightColor:"#f4a30b"  }]
            };
    
    componentWillMount() {
        const strInputCode = "<i class=\"fa fa-folder-open\"></i>"
        const cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        console.log("validIcon",cleanText);
        this.setState({progressVisible:true});
        DefaultPreference.get('magic').then((value) => this.fetchPortalItems(value));


    }

    fetchPortalItems(value){
        this.setState({magic:value});
        const query = this.urlToFetchPortalItems();
        console.log("urlToFetchPortalItems",query);
        this.executeQuery(query,true);
    }

    urlForLogOut() {
        const data = {
            MAGIC:this.state.magic
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
        return 'https://dev-pradeep.ez2xs.com/call/api.logoutAll?' + querystring;
      }

      urlToFetchPortalItems() {
        const data = {
            MAGIC:this.state.magic
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
        return 'https://dev-pradeep.ez2xs.com/call/api.getMedewerkerInfo?' + querystring;
      }

    performLogOut(){
        this.setState({progressVisible:true});
        const query = this.urlForLogOut();
        this.executeQuery(query,false);
    }
    

    executeQuery(urlString,isFetchPortal){
        console.log('isFetchPortal',isFetchPortal);

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

    finishFetchinPortalItems(response){
        if(response.status === 200){
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
            // convertedArray = this.state.portalItems.push(convertedArray);
            this.setState({portalItems:this.state.portalItems});
            console.log('portalItems',this.state.portalItems);
            this.setState({progressVisible:false});
        }else{
            this.showErrorMessage("Authorization Failed");
        }
    }

    showErrorMessage(message){
        Snackbar.show({
          title: message,
          duration: Snackbar.LENGTH_LONG,
        });
        Actions.pop();
      }
    

     json2array(json){
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        return result;
    }
    

    logOut(response){
        console.log('response',response);
        this.setState({progressVisible:false});
        DefaultPreference.set('magic','').then(function() {console.log('done')});
        Actions.auth();
    }

    performActionForGridItem(item){
        if(item.item.naam=="qrcodescan"){
            Actions.scan();
        }else{
            Actions.portalPage({webUrl:"https://dev-pradeep.ez2xs.com/n/#" + item.item.link})
        }
    }

    performAppExit(){
        Platform.OS  === 'android' ?BackAndroid.exitApp(): Actions.main();
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
            itemDimension={100}
            sections={[
                {
                title: 'Title1',
                data: this.state.portalItems
                }
            ]}
            style={styles.gridView}
            renderItem={({ item }) => (
                // <GridItem colorCode={item.code} imageName={item.image}  highlightColor={item.highlighColor} webUrlSource="https://www.google.com" onPress={() => Linking.openURL("https://dev-pradeep.ez2xs.com/n/#auditor")}></GridItem>
                <GridItem colorCode={item.code} imageName={item.icon} highlightColor={item.highlightColor}   onPress={() => this.performActionForGridItem({item})}></GridItem>
                // <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                // <Text style={styles.itemName}>{item.name}</Text>
                // <Text style={styles.itemCode}>{item.code}</Text>
                // </View>
            )}
            renderSectionHeader={({ section }) => (
                <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} onPressExit={()=>this.performAppExit()} onPress={() => this.performLogOut()} ></Header>
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