import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { SuperGridSectionList, GridView  } from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';


import GridItem from './components/GridItem';
import Header from './components/Header';
class GridMenu extends Component {

    state = { magic:'',
             progressVisible:false
            };
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
                    title="Progress Dialog" 
                    message="Please, wait..."
                />  
          <SuperGridSectionList
            itemDimension={100}
            sections={[
                {
                title: 'Title1',
                data: [
                    { name: 'TURQUOISE', code: '#676767', highlighColor: '#f4a30b',image:'web' }, { name: 'NEPHRITIS', code: '#676767',highlighColor: '#f4a30b',image:'web' },
                     { name: 'EMERALD', code: '#676767', highlighColor: '#f4a30b',image:'helpoutline'}, { name: 'AMETHYST', code: '#414141',highlighColor: '#f4a30b',image:'folder' },
                      { name: 'AMETHYST', code: '#414141',highlighColor: '#f4a30b',image:'gavel' },
                    { name: 'WET ASPHALT', code: '#414141',highlighColor: '#f4a30b',image:'smartphone' }, { name: 'GREEN SEA', code: '#414141',highlighColor: '#f4a30b',image:'web' },
                    { name: 'NEPHRITIS', code: '#414141',highlighColor: '#f4a30b',image:'checkbox' },  { name: 'NEPHRITIS', code: '#414141',highlighColor: '#f4a30b',image:'timer' }, 
                    { name: 'NEPHRITIS', code: '#414141',highlighColor: '#f4a30b',image:'eurosymbol' }, { name: 'NEPHRITIS', code: '#414141',highlighColor: '#f4a30b',image:'web' },
                    { name: 'NEPHRITIS', code: '#414141',highlighColor: '#f4a30b',image:'trendingup' },
                ]
                }
            ]}
            style={styles.gridView}
            renderItem={({ item }) => (
                <GridItem colorCode={item.code} imageName={item.image} highlightColor={item.highlighColor} webUrlSource="https://www.google.com" onPress={() => Actions.portalPage({webUrl:"https://www.google.com"})}></GridItem>
                // <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                // <Text style={styles.itemName}>{item.name}</Text>
                // <Text style={styles.itemCode}>{item.code}</Text>
                // </View>
            )}
            renderSectionHeader={({ section }) => (
                <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} onPress={() => this.performLogOut()} ></Header>
            )}
            />
            </View>
        );
    };

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
    performLogOut(){
        this.setState({progressVisible:true});
        DefaultPreference.get('magic').then((value) => this.setState({magic:value}));
        const query = this.urlForLogOut();
        this.executeQuery(query);
    }

    executeQuery(urlString){
        axios.get(urlString)
        .then(response => this.logOut(response));
        
    }

    logOut(response){
        console.log('response',response);
        this.setState({progressVisible:false});
        Actions.auth();
    }
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