import React, {Component} from 'react';
import { WebView,BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class WebPage extends Component{

    componentWillMount(){

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

      handleBackButton = () => {
        Actions.pop();
         return true;
       } 
       
    render(){
        return(
            <WebView source={{uri:this.props.webUrl}}></WebView>
        );
    }
}