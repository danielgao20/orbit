// App.tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './app/index';

const App: React.FC = () => {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
