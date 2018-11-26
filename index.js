/** @format */
import React from 'react';
import {AppRegistry,View} from 'react-native';
import Router from './src/Router';
import Home from './src/Home';
import {name as appName} from './app.json';
import RouterComponent from './src/Router';

const App = () =>(
    <Router></Router>
)

AppRegistry.registerComponent(appName, () => App);
