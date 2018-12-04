import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import { AlertIOS,StyleSheet,Platform,Image,Text } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native-animatable';

class FingerPrintScannerPage extends Component{

    constructor(props) {
        super(props);
        this.state = { errorMessage: undefined };
      }

    dismissHandlePopUp() {
        console.log("handlePopupDismissed");
    }

    componentDidMount() {

        // FingerprintScanner
        // .isSensorAvailable()
        // .then(biometryType => this.setState({ biometryType }))
        // .catch(error => this.setState({ errorMessage: error.message }));
    

        FingerprintScanner
        .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
        .then(() => {
            Actions.gridMenu();
        })
        .catch((error) => {
            this.setState({ errorMessage: error.message });
            Actions.pinCodePage();
        });
  
    }
    render() {
        const { errorMessage } = this.state;

        return(
            <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} ></Header>
            // Platform.select({
            //     ios:<Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} ></Header>,
            //     android: 
            //             <View >
            //             <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} ></Header>
            //                 <View style={styles.contentViewContainer}>
            //                 <Image
            //                     style={styles.logo}
            //                 />
            //                 <Text style={styles.heading}>
            //                     Fingerprint{'\n'}Authentication
            //                 </Text>
            //                 <Text>
            //                 {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
            //                 </Text>
            //                 </View>
            //             </View>
            //   })
            );
    }

}

FingerPrintScannerPage.propTypes = {
    handlePopupDismissed: PropTypes.func.isRequired,
};


//   styles= StyleSheet.create({
//     viewContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'rgba(0, 164, 222, 0.9)',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       contentViewContainer: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//       },
//       logo: {
//         marginVertical: 45,
//       },
//       heading: {
//         textAlign: 'center',
//         color: '#00a4de',
//         fontSize: 21,
//       },
//       description: (error) => ({
//         textAlign: 'center',
//         color: error ? '#ea3d13' : '#a5a5a5',
//         height: 65,
//         fontSize: 18,
//         marginVertical: 10,
//         marginHorizontal: 20,
//       }),
//       buttonContainer: {
//         padding: 20,
//       },
//       buttonText: {
//         color: '#8fbc5a',
//         fontSize: 15,
//         fontWeight: 'bold',
//       },
//   })

export default FingerPrintScannerPage;