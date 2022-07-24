import logo from './logo.svg';
import './App.css';
// import Main from './Components/Main';
import { useState, useEffect } from 'react';
import Login2 from './Components/Login2';
import { Button } from 'semantic-ui-react';

function App() {
  return (
    <div className='App'>
      <Login2 className='Login'/>
    </div>
  );
}

export default App;
