/**
 * Awesome Balanza
 * https://github.com/D4ITON/awesomebalanza
 *
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import HomePage from './src/pages/HomePage';
import {LocalizationProvider} from './src/LocalizationContext';

const App = () => {
  return (
    <LocalizationProvider>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <SafeAreaView style={{flex: 1}}>
        <HomePage />
      </SafeAreaView>
    </LocalizationProvider>
  );
};

export default App;
