        
import React, { Component } from 'react';


export class IntroScreen extends Component {
    
    clickHandler(e){
       e.preventDefault();
         
            this.props.clickButton();
         }
        
         
    
    
  render() {
    return (
    <div className="postIntro">
            <p>Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd.</p>
            <button onClick={this.clickHandler.bind(this)} className="buttonIntro">Get started</button>
        </div>
 );
  }
}