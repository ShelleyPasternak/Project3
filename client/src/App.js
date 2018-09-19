import React, { Component } from 'react';
// import paw.png from './public/img/paw.png';
import './App.css';
import PetForm from './components/PetForm'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/img/paw.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Petpholio</h1>
        </header>
        <p className="App-intro">
          Add a Pet Here  <code>src/App.js</code>
        </p>
        <PetForm>
          
        </PetForm>
      </div>
    );
  }
}

export default App;
