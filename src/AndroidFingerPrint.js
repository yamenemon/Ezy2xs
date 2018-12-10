import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  TouchableOpacity,
    Text,
  View,
  ViewPropTypes,
  BackHandler
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Actions } from 'react-native-router-flux';
import ShakingText from './components/ShakingText';
import styles from './components/styles';
import { Icon } from 'react-native-elements';
import Header from './components/Header';



class AndroidFingerPrint extends Component {

  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={styles.container}>
        <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} ></Header>
        <View style={[styles.contentContainer, style]}>

        <Icon
        styles={styles.logo}
            name="fingerprint-o"
            size={40}
            type='font-awesome'
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
