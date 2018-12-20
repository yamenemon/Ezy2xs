import React from 'react';
import { Image,Platform } from 'react-native';
import {LeftButton} from 'react-native-vector-icons';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import Home from './Home';
import GridMenu from './GridMenu';
import Scanner from './Scanner';
import FingerPrintScannerPage from './FingerPrintScannerPage';
import PinCodePage from './PinCodePage';
import WebPage from './WebPage';
import PortalPage from './PortalPage';
import AndroidFingerPrint from './AndroidFingerPrint';
import LoginPage from './LoginPage';
import { Icon } from 'react-native-elements';
import Button from './components/Button';
import { TouchableHighlight } from 'react-native';
import HelpPage from './HelpPage';

const RouterComponent = (props) =>{
    return(
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key="auth" initial={props.isAuthInitial} navigationBarStyle={{ backgroundColor: '#f4a30b' }}>
                <Scene key="login"  component={Home} hideNavBar title="Home"></Scene>
                <Scene 
                key="loginPage"  
                component={LoginPage} 
                title="Login" 
                titleStyle={{fontSize:20,flex: 1,flexWrap: "wrap"}}
                renderBackButton={() => 
                    <TouchableHighlight style={{marginLeft:10}} underlayColor='transparent' onPress={()=>Actions.pop()}>
                    <Icon
                        size={20}
                        name="chevron-left"
                        type='font-awesome'
                        color='#000'
                        />           
                     </TouchableHighlight>
           }></Scene>
                <Scene key="webPage" 
                titleStyle={{fontSize:20,flex: 1,flexWrap: "wrap"}}  
                component={WebPage} 
                title='Release'
                renderBackButton={() => 
                    <TouchableHighlight style={{marginLeft:10}} underlayColor='transparent' onPress={()=>Actions.pop()}>
                    <Icon
                        size={20}
                        name="chevron-left"
                        type='font-awesome'
                        color='#000'
                        />           
                     </TouchableHighlight>
           }/>
                </Scene>
                <Scene Modal key='scan' hideNavBar>
                <Scene Modal key="scannerPage" component={Scanner} title='Scan QR Code' hideNavBar/>
                </Scene>
                <Scene key="main" initial={props.isMainInitial} navigationBarStyle={{ backgroundColor: '#f4a30b' }}>
                <Scene key="fingerPrintPage" component={FingerPrintScannerPage} title='Authenticate Using FingerPrint' initial={Platform.OS==="ios"?true:false}/>
                <Scene key="androidFingerPrint" component={AndroidFingerPrint} title='Authenticate Using FingerPrint' initial={Platform.OS==="android"?true:false} hideNavBar />
                <Scene key="pinCodePage" titleStyle={{fontSize:20,flex: 1,flexWrap: "wrap"}}component={PinCodePage} title='Authenticate Using PinCode'/> 
                <Scene key="gridMenu" 
                rightButtonImage={<Image source={{uri: 'dropdown'}}></Image>}
                component={GridMenu} 
                title='Menu'
                hideNavBar
                />
                <Scene 
                hideBackImage
                key="portalPage" 
                component={PortalPage} 
                title='WebView'
                titleStyle={{ fontSize:18,flex: 1,flexWrap: "wrap"}}
                renderBackButton={() => 
                    <TouchableHighlight style={{marginLeft:10}} underlayColor='transparent' onPress={()=>Actions.pop()}>
                    <Icon
                        size={20}
                        name="chevron-left"
                        type='font-awesome'
                        color='#000'
                        />           
                     </TouchableHighlight>
           }
        />

                <Scene 
                hideBackImage
                key="helpPage" 
                component={HelpPage} 
                title='Help'
                titleStyle={{ fontSize:18,flex: 1,flexWrap: "wrap"}}
                renderBackButton={() => 
                    <TouchableHighlight style={{marginLeft:10}} underlayColor='transparent' onPress={()=>Actions.pop()}>
                    <Icon
                        size={20}
                        name="chevron-left"
                        type='font-awesome'
                        color='#000'
                        />           
                     </TouchableHighlight>
           }
        />

                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;