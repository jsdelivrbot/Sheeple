import React, { Component } from 'react';
import profilePic from "../../img/anoymous-profilepic.png";
import '../App.css';


export class FacebookPost extends Component {
    
    constructor(){
        super();
        this.state = {
            Actief: "post",
            Selected: "action",
            Selected2: "action"
        }
    }
     clickHandler(e){
       e.preventDefault();
        this.props.MeerArtiekelen();
         this.setState({Actief: "post nonactive",
                       Selected: "action chosen"});
    }
    clickHandler2(e){
       e.preventDefault();
        this.props.MeerArtiekelen();
         this.setState({Actief: "post nonactive",
                       Selected2: "action chosen"});
    }
    
  render() {
    return (
        
    <div className={this.state.Actief}>
            <div className="post-header cf">
                <img src={profilePic} className="profilePic" alt="profilePic" />
                <h2>{this.props.user}</h2>
                <div className="post-info">
                    <p>September 18 at 11:17  <span className="icon">g</span></p>
                </div>
            </div>
            <div className="post-content">
                <p>{this.props.vraag}</p>
            </div>
            <div className="post-likesamount">
                <div className="likesamount"><span className="icon">L</span>243</div>
                <div className="dislikesamount"><span className="icon">D</span>24</div>
            </div>
            <div className="post-actions cf">
                <div className={this.state.Selected} onClick={this.clickHandler.bind(this)}><a href="#"><span className="icon">l</span>Like</a></div>
                <div className={this.state.Selected2} onClick={this.clickHandler2.bind(this)}><a href="#"><span className="icon">d</span>Dislike</a></div>
            </div>
        </div>
 );
  }
}
