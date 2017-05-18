import React, { Component } from 'react';
import logo from "../../img/glitch_fakebook.gif";
import '../App.css';

export class Header extends Component {
    
    
  render() {
    return (
        
        <header className="cf">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="notificationglobe active" href="#">
            <span className="icon">g</span>
            <div className="notification-amount">1</div>
        </a>
    </header>
        
    );
  }
}
