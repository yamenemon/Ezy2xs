import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Actions } from 'react-native-router-flux';
import { View,Platform } from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { ProgressDialog } from 'react-native-simple-dialogs';
import axios from 'axios';
class FingerPrintScannerPage extends Component{

    constructor(props) {
        super(props);
        this.state = { errorMessage: undefined,magic:'',progressVisible:false,domainName:'',baseUrl:""};
      }

    dismissHandlePopUp() {
        console.log("handlePopupDismissed");
    }

    componentDidMount() {
        DefaultPreference.get('magic').then((value) => this.setState({magic:value}));
        DefaultPreference.get('domainName').then((value) => this.setState({domainName:value}));
        DefaultPreference.get('baseUrl').then((value) => this.setState({baseUrl:value}));
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

    componentWillUnmount(){
        FingerprintScanner.release();
    }

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
            <View style={{flex:1,flexDirection: "column",backgroundColor: '#fff'}}>
                <ProgressDialog 
                    visible={this.state.progressVisible} 
                    message="Please, wait..."
                />  
                <Header logoutIconName={require('./components/power_off/power_settings.png')} tvIconName={require('./components/tv/tv.png')} onPressExit={()=>this.performAppExit()} onPress={() => this.performLogOut()} domainName={this.state.domainName}></Header>
            </View>
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

// styles= {
//     container: {
//         flex: 1,
//         flexDirection: "column",
//       backgroundColor: '#fff',
//     }
//   }

export default FingerPrintScannerPage;