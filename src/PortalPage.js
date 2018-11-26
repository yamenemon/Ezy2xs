import React, {Component} from 'react';
import { WebView } from 'react-native';

export default class PortalPage extends Component{
    render(){
        return(
            <WebView source={{uri:this.props.webUrl}}></WebView>
        );
    }
}