import React, {Component} from 'react';
import { WebView } from 'react-native';
import DefaultPreference from 'react-native-default-preference';

export default class PortalPage extends Component{
    state = {
        magicValue:"",
        url:"",
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
         headerTintColor:"#000000",
         headerStyle: {tintColor:"#000000",backgroundColor:"#f4a30b"}
        });
    
    componentWillMount(){
        DefaultPreference.get('magic').then((value) => this.setHeader(value));
    }

    setHeader(value){
        this.setState({magicValue: value})
        console.log("magic",this.state.magicValue)
        
    }
    render(){
        return(
            <WebView 
            source={{uri:this.props.webUrl, headers:{"Authorization":"MAGIC "+this.state.magicValue,"Content-Type":"application/json"}}}></WebView>
        );
    }
}