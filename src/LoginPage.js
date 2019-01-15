import React, {Component} from 'react';
import {BackHandler,StyleSheet,ScrollView,Platform,KeyboardAvoidingView,NetInfo} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import Header from './components/Header';
import Button from './components/Button';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {Actions} from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';

class LoginPage extends Component{

    // static navigationOptions = ({ navigation }) => ({
    //      headerTintColor:"#000000",
    //      headerStyle: {tintColor:"#000000",backgroundColor:"#f4a30b"}
    //     });
    state={
        emailString: "",
        passwordString: "",
        progressVisible:false,
        baseUrl:"https://dev-pradeep.ez2xs.com/call/"
    };

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        DefaultPreference.get('baseUrl').then((value) => this.setState({baseUrl:value})
        );
      }
      


      componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      handleBackButton = () => {
        Actions.pop();
         return true;
       } 

    onBlur() {
        console.log('#####: onBlur');
      }
    
      urlForLogin() {

        const data = {
          login:this.state.emailString,
          password:this.state.passwordString
        };
        // data[key] = value;
        const querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
        return  this.state.baseUrl+'api.login?' + querystring;
      }
    

    checkValidation(){
        if((this.state.emailString.length == 0) || (this.state.passwordString.length == 0))
        {
            this.showErrorMessage("Please fill up all the fields");
            return;
        }

        // if(this.validate(this.state.emailString)){
            this.performLogin();
        // }else{
        //     this.showErrorMessage("Please provide valid mail address");
        //     return;

        // }
    }

    validate = (text) => {
            console.log(text);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(text) === false)
            {
            return false;
                }
            else {
                return true;
            }
        }
        

    performLogin(){
        this.setState({progressVisible:true});

                // const query  = this.urlForLogin();
                // this.performLoginAPI(query);
          
        if(NetInfo.isConnected)
        {
            const query  = this.urlForLogin();
            this.performLoginAPI(query);
        }else{
            this.showErrorMessage("No internet connection");
        }

        
    }

    performLoginAPI(urlString){
        axios.get(urlString)
        .then(response => this.proceedToFingerPrint(response)).catch(() => {
                this.showErrorMessage('Authorization Failed');
            });
      }

    proceedToFingerPrint(response){
        console.log('response',response)
        this.setState({progressVisible:false});
                DefaultPreference.set('magic', response.data.MAGIC).then(() => {
                    console.log('platform',Platform.OS);
                    Platform.OS === 'android' ?Actions.main(): Actions.main();
            
                    console.log('response',response.data);
                });
    }

    showErrorMessage(message){
        Snackbar.show({
          title: message,
          duration: Snackbar.LENGTH_LONG,
        });
        this.setState({progressVisible:false});

      }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <ProgressDialog 
            visible={this.state.progressVisible} 
            message="Please, wait..."
            />  
            <ScrollView>
            <Header>
                </Header>
                <FloatingLabel labelStyle={styles.labelInput}
                autoCapitalize ='none'
                 keyboardType = "email-address"
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                onChangeText={(value) => this.setState({emailString:value})}
                >Email/Username
                </FloatingLabel>
                <FloatingLabel 
                    labelStyle={styles.labelInput}
                    inputStyle={styles.input}
                    style={styles.formInput}
                    password
                    onChangeText={(value) => this.setState({passwordString:value})}
                    >Password</FloatingLabel>
            <Button buttonTitle='Login' onPress={()=>this.checkValidation()}></Button>
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      backgroundColor: '#fff',
      justifyContent: 'flex-start',  
      },
    labelInput: {
        color: '#000000',
        marginBottom:20,
      },
      formInput: {    
        borderBottomWidth: 1.5, 
        marginLeft: 20,
        marginRight:20,
        marginBottom:20,
        marginTop:20,
        borderColor: '#f4a30b',       
      },
      input: {
        borderWidth: 0
      }
});

export default LoginPage;