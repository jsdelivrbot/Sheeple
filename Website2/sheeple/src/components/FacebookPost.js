import React, { Component } from 'react';
import profilePic from "../../img/anoymous-profilepic.png";
import '../App.css';


export class FacebookPost extends Component {
    
    
  render() {
    return (
    <div className="post">
            <div className="post-header cf">
                <img src={profilePic} className="profilePic" alt="profilePic" />
                <h2>AnonymousUser243</h2>
                <div className="post-info">
                    <p>September 18 at 11:17 &bull <span className="icon">g</span></p>
                </div>
            </div>
            <div className="post-content">
                <p>A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt.</p>
            </div>
            <div className="post-likesamount">
                <div className="likesamount"><span className="icon">L</span>243</div>
                <div className="dislikesamount"><span className="icon">D</span>24</div>
            </div>
            <div className="post-actions cf">
                <div className="action"><a href="#"><span className="icon">l</span>Like</a></div>
                <div className="action"><a href="#"><span className="icon">d</span>Dislike</a></div>
            </div>
        </div>
 );
  }
}
