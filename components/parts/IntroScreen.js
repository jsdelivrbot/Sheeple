        
import React, { Component } from 'react';
import like from "../../public/img/like.png";
import dislike from "../../public/img/dislike.png";
import real from "../../public/img/real.png";
import fake from "../../public/img/fake.png";


export class IntroScreen extends Component {
    
    clickHandler(e){
       e.preventDefault();
         
            this.props.clickButton();
         }
        
         
    
    
  render() {
    return (
    <div className="postIntro cf">
        <div className="welcomecontainer">    
        <h3>Welcome</h3>
        
        <div className="expl">
        <p>Like or dislike the posts.</p>
        </div>
        <ul className="cf">
        <li className="leftImage"><img src={like} className="introImage"/><h4>Like</h4></li>
        <li className="rightImage"><img src={dislike} className="introImage"/><h4>Dislike</h4></li>
        </ul>
        <p>Spot the fake articles.</p>
        <ul>
        <li className="leftImage"><img src={real} className="introImage"/><h4>Real</h4></li>
        <li className="rightImage"><img src={fake} className="introImage"/><h4>Fake</h4></li>
        </ul>
        </div>
        
            <button onClick={this.clickHandler.bind(this)} className="buttonIntro">Get started</button>
        </div>
 );
  }
}