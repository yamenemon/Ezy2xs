import React from 'react';
import { Image } from 'react-native';
import { Scene, Router, Modal } from 'react-native-router-flux';
import Home from './Home';
import GridMenu from './GridMenu';
import Scanner from './Scanner';
import FingerPrintScannerPage from './FingerPrintScannerPage';
import PinCodePage from './PinCodePage';
import WebPage from './WebPage';
import PortalPage from './PortalPage';
import AndroidFingerPrint from './AndroidFingerPrint';
import LoginPage from './LoginPage';

const RouterComponent = (props) =>{
    return(
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key="auth" initial={props.isAuthInitial}>
                <Scene key="login"  component={Home} hideNavBar ></Scene>
                <Scene key="loginPage"  component={LoginPage} title="Login"  ></Scene>
                <Scene key="webPage" component={WebPage} title='WebView' />
                </Scene>
                <Scene Modal key='scan' hideNavBar>
                <Scene key="scannerPage" component={Scanner} title='Scan QR code' hideNavBar/>
                </Scene>
                <Scene key="main" initial={props.isMainInitial}>
                <Scene key="fingerPrintPage" component={FingerPrintScannerPage} title='Authenticate Using FingerPrint' initial/>
                <Scene key="androidFingerPrint" component={AndroidFingerPrint} title='Authenticate Using FingerPrint' hideNavBar />
                <Scene key="pinCodePage" component={PinCodePage} title='Authenticate Using PinCode'/> 
                <Scene key="gridMenu" 
                rightButtonImage={<Image source={{uri: 'dropdown'}}></Image>}
                component={GridMenu} 
                title='GridMenu'
                hideNavBar
                />
                <Scene key="portalPage" component={PortalPage} title='WebView'/>
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;