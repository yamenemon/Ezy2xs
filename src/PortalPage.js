import React, {Component} from 'react';
import { WebView } from 'react-native';
import DefaultPreference from 'react-native-default-preference';

export default class PortalPage extends Component{
    state = {
        magicValue:""
    }
    componentWillMount(){
        DefaultPreference.get('magic').then((value) => this.setState({magicValue: value}));
    }
    render(){
        return(
            <WebView source={{uri:this.props.webUrl, headers:{ "custom-app-header": "react-native-ios-app",Authorization: "MAGIC " + this.state.magicValue}}}></WebView>
        );
    }
}