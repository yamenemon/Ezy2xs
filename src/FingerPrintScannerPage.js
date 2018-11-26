import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header'
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native-animatable';

class FingerPrintScannerPage extends Component{

    handlePopupDismissed() {
        console.log("handlePopupDismissed");
    }

    componentDidMount() {
        FingerprintScanner
        .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
        .then(() => {
            Actions.main();
        })
        .catch((error) => {
            Actions.pinCodePage();
        });
  
    }
    render() {
        return(
            <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} ></Header>
            );
    }

}

FingerPrintScannerPage.propTypes = {
    handlePopupDismissed: PropTypes.func.isRequired,
};

export default FingerPrintScannerPage;