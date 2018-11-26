import React , {Component} from   'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PINCode, { PinResultStatus, hasUserSetPinCode } from "@haskkor/react-native-pincode";
import DefaultPreference from 'react-native-default-preference';

export default class PinCodePage extends Component{

    state={pinCodeType:"choose"};
    componentWillMount(){
        if(hasUserSetPinCode)
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
            Actions.main();
        }
    }

    async hasUserSetPinCode(){
        DefaultPreference.set('Pincode', '').then(function() {console.log('done')});

    }

}