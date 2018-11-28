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

const RouterComponent = () =>{
    return(
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key="auth" initial>
                <Modal hideNavBar>
                <Scene key="login"  component={Home} hideNavBar ></Scene>
                <Scene key="scannerPage" component={Scanner} title='Scan QR code' hideNavBar>
                </Scene>
                </Modal>
                <Scene key="webPage" component={WebPage} title='WebView' />
                <Scene key="fingerPrintPage" component={FingerPrintScannerPage} title='Authenticate Using FingerPrint' />
                <Scene key="androidFingerPrint" component={AndroidFingerPrint} title='Authenticate Using FingerPrint' hideNavBar />
                <Scene key="pinCodePage" component={PinCodePage} title='Authenticate Using PinCode'/> 
                </Scene>
                <Scene key="main">
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