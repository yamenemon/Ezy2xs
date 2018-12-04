import React, {Component} from 'react';
import {View,StyleSheet,ScrollView,Platform,KeyboardAvoidingView} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import Header from './components/Header';
import Button from './components/Button';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {Actions} from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';

class LoginPage extends Component{

    state={
        emailString: "",
        passwordString: "",
        progressVisible:false,
    };
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
        return 'https://dev-pradeep.ez2xs.com/call/api.login?' + querystring;
      }
    

    checkValidation(){
        if((this.state.emailString.length == 0) || (this.state.passwordString.length == 0))
        {
            this.showErrorMessage("Please fill up all the fields");
            return;
        }

        if(this.validate(this.state.emailString)){
            this.performLogin();
        }else{
            this.showErrorMessage("Please provide valid mail address");
            return;

        }
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
        const query  = this.urlForLogin();
        this.performLoginAPI(query);
        
    }

    performLoginAPI(urlString){
        axios.get(urlString)
        .then(response => this.proceedToFingerPrint(response)).catch((error) => {
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
        this.setState({progressVisible:false});
        Snackbar.show({
          title: message,
          duration: Snackbar.LENGTH_LONG,
        });
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
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                onChangeText={(value) => this.setState({emailString:value})}
                >Email
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