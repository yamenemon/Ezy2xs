import React, {Component} from 'react';
import { View,WebView,ActivityIndicator,StyleSheet } from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { Icon } from 'react-native-elements';

export default class PortalPage extends Component{
    state = {
        magicValue:"",
        url:"",
        visible:true
    }

    // static navigationOptions = ({ navigation }) => ({
    //     title: `${navigation.state.params.title}`,
    //      headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
    //      headerTintColor:"#000000",

    //      headerStyle: {tintColor:"#000000",backgroundColor:"#f4a30b"}
    //     });
    
    componentWillMount(){
        DefaultPreference.get('magic').then((value) => this.setHeader(value));
    }

    hideSpinner() {
        this.setState({ visible: false });
      }
    
    setHeader(value){
        this.setState({magicValue: value})
        console.log("magic",this.state.magicValue)
        
    }
    render(){
        const jsCode = `document.getElementsByTagName('nav')[0].style.display='none';`;
        return(
            <View style={styles.container}>
            <WebView 
            onLoad={() => this.hideSpinner()}
            source={{uri:this.props.webUrl, headers:{"Authorization":"MAGIC "+this.state.magicValue,"Content-Type":"application/json"}}}
            javaScriptEnabled={true}
            injectedJavaScript={jsCode}
            ></WebView>
            {this.state.visible && (
            <ActivityIndicator
            style={{ position:"relative",alignSelf:"center",tintColor:"#f4a30b" }}
                size="large"
            />
            )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: '#fff',
      alignItems: "stretch",
      justifyContent: "center"
    }
});