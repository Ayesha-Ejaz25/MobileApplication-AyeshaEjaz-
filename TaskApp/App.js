import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import StorageScreen from './assets/frontend/screens/StorageScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <StorageScreen />
    </SafeAreaView>
  );
};

export default App;