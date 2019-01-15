/** @format */
import React from 'react';
import {AppRegistry,View} from 'react-native';
import Router from './src/Router';
import Home from './src/Home';
import {name as appName} from './app.json';
import DefaultPreference from 'react-native-default-preference';
import AppFlow from "./src/AppFlow";

const App = () =>(
    <AppFlow></AppFlow>
)

AppRegistry.registerComponent(appName, () => App);
