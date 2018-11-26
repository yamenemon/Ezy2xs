import React, {Component} from 'react';
import { WebView } from 'react-native';

export default class WebPage extends Component{
    render(){
        return(
            <WebView source={{uri:this.props.webUrl}}></WebView>
        );
    }
}