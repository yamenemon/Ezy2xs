import React, {Component} from 'react';

import Router from './Router';
import DefaultPreference from 'react-native-default-preference';
import {BackHandler} from 'react-native';
export default class AppFlow extends Component{
    state= {
        isAuthFlow:false,
        isMainFlow:false
    }

checkFlow(value){
   if(value.length==0){
    this.setState({isAuthFlow:true,isMainFlow:false});
   }else{
    this.setState({isAuthFlow:false,isMainFlow:true});
   }
}

componentWillMount(){
    DefaultPreference.get('magic').then((value) => this.checkFlow(value));
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

}

componentWillUnmount(){
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = () => {
     return true;
   } 
   

render(){
    return(
        <Router isAuthInitial={this.state.isAuthFlow} isMainInitial={this.state.isMainFlow} ></Router>
    );
}
}