import React, { Component } from 'react';
import logo from "../../public/img/glitch_fakebook.gif";
import logoPong from "../../public/img/pong_logo_melding.png";

//import '../../public/App.css';

export class Header extends Component {
    
    
  render() {
    return (
        
        <div>
        <header className="cf">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="notificationglobe active" href="#">
        </a>
    </header>
        <div className="clearfixedheader"></div>
        </div>
        
    );
  }
}
