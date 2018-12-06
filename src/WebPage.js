import React, {Component} from 'react';
import { WebView } from 'react-native';

export default class WebPage extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTintColor:"#000000",
        headerStyle: {tintColor:"#000000",backgroundColor:"#f4a30b"}
       });
    render(){
        return(
            <WebView source={{uri:this.props.webUrl}}></WebView>
        );
    }
}