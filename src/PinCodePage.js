import React , {Component} from   'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PINCode, { PinResultStatus, hasUserSetPinCode } from "@haskkor/react-native-pincode";
import DefaultPreference from 'react-native-default-preference';

export default class PinCodePage extends Component{

    state={pinCodeType:"choose",
            hasUserSetPin:'false run-android'};
            
    componentWillMount(){
        console.log('hasUserSetPinCode',hasUserSetPinCode);
        DefaultPreference.get('pincode').then((value) => this.setpinCodeType(value));
    }   

    setpinCodeType(value){
        this.setState({hasUserSetPin:value})
        console.log('hasUserSetPin',this.state.hasUserSetPin);
        if(this.state.hasUserSetPin === 'true')
        {
            this.setState({pinCodeType:"enter"});
        }


    }

    render()
    {
        return(
            <PINCode status={this.state.pinCodeType} finishProcess={(e) =>{
                this.proceedToMainMenu();
            }}/>
        );
    }

    proceedToMainMenu(){
        if(PinResultStatus.success)
        {
            DefaultPreference.set('pincode', 'true').then(() => {
                Actions.gridMenu();
              });
        }
    }

    async hasUserSetPinCode(){

    }

}