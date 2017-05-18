import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FacebookPost} from './components/FacebookPost';
import {Header} from './components/Header';

import './index.css';

class App extends Component {
    
  render() {
    return (
        <div className="bigContainer">
        <div className="smallContainer"> <Header /> </div>
        <div className="smallContainer2"> <FacebookPost /> </div>
        </div>
        
        
        
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

