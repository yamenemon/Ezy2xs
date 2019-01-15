import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  TouchableOpacity,
    Text,
  View,
  ViewPropTypes,
  BackHandler,
  BackAndroid
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Actions } from 'react-native-router-flux';
import ShakingText from './components/ShakingText';
import styles from './components/styles';
import { Icon } from 'react-native-elements';
import Header from './components/Header';
import DefaultPreference from 'react-native-default-preference';
import axios from 'axios';
import { ProgressDialog } from 'react-native-simple-dialogs';




class AndroidFingerPrint extends Component {

  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined,progressVisible:false,domainName:'',baseUrl:""};
  }

  componentDidMount() {
    DefaultPreference.get('magic').then((value) => this.setState({magic:value}));
    DefaultPreference.get('domainName').then((value) => this.setState({domainName:value}));
    DefaultPreference.get('baseUrl').then((value) => this.setState({baseUrl:value}));

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        Actions.gridMenu();

      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
        Actions.pinCodePage();
      });
  }

  handleBackButton = () => {
    return true;
}


  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  performLogOut(){
    this.setState({progressVisible:true});
    const query = this.urlForLogOut();
    this.executeQuery(query);
}

urlForLogOut() {
    const data = {
        MAGIC:this.state.magic
    };
    // data[key] = value;
    const querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');
      return  this.state.baseUrl+"api.logoutAll?" + querystring;
    }
  executeQuery(urlString){
    axios.get(urlString)
    .then(response => this.logOut(response)
    );
  }

  logOut(response){
    console.log('response',response);
    this.setState({progressVisible:false});
    DefaultPreference.set('magic','').then(function() {console.log('done')});
    Actions.auth();
}

performAppExit(){
  BackAndroid.exitApp();
}
  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={styles.container}>
          <ProgressDialog 
        visible={this.state.progressVisible} 
        message="Please, wait..."
        />  
        <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} onPress={() => this.performLogOut()} onPressExit={()=>this.performAppExit()} domainName={this.state.domainName}></Header>
        <View style={[styles.contentContainer, style]}>

        <Icon
        styles={styles.logo}
            name="md-finger-print"
            size={40}
            type='ionicon'
            color='#f50'
           />

          <Text style={styles.heading}>
            Fingerprint{'\n'}Authentication
          </Text>
          <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessage)}>
            {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}
          >
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

AndroidFingerPrint.propTypes = {
  style: ViewPropTypes.style,
  handlePopupDismissed: PropTypes.func.isRequired,

};


export default AndroidFingerPrint;
