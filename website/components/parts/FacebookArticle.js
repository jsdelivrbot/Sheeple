import React, { Component } from 'react';
import profilePic from "../../public/img/anoymous-profilepic.png";
//import '../../public/App.css';



//opslossing voor alle images van de artiekelen in te laden zonder voor elke images een import te moeten schrijven
//http://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../../public/img/', false, /\.(png|jpe?g|svg)$/));

export class FacebookArticle extends Component {
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
         this.props.likeArtiekel(this.props.vragen.id);
         
    }
    clickHandler2(e){
       e.preventDefault();
        this.props.MeerArtiekelen();
         this.setState({Actief: "post nonactive",
                       Selected2: "action chosen"});
        this.props.dislikeArtiekel(this.props.vragen.id);
    }
    
  render() {
    return (
    <div className= {this.state.Actief}>
            <div className="post-header cf">
                <img src={profilePic} className="profilePic" alt="profilePic" />
                <h2>{this.props.user}</h2>
                <div className="post-info">
                    <p>September 18 at 11:17  <span className="icon">g</span></p>
                </div>
            </div>
            <div className="post-content">
                <p>{this.props.vraag}</p>
                <div className="article">
                    <img alt={this.props.imageTitel} src={images[this.props.image]} />
                    <h3>{this.props.imageTitel}</h3>
        
                </div>
            </div>
            <div className="post-likesamount">
                <div className="likesamount"><span className="icon">L</span>
        {this.props.likes}</div>
                <div className="dislikesamount"><span className="icon">D</span>
        {this.props.dislikes}</div>
            </div>
            <div className="post-actions cf">
                <div className={this.state.Selected} onClick={this.clickHandler.bind(this)} ><a href="#"><span className="icon">l</span>Like</a></div>
                <div className={this.state.Selected2} onClick={this.clickHandler2.bind(this)} ><a href="#"><span className="icon">d</span>Dislike</a></div>
            </div>
        </div>
 );
  }
}
