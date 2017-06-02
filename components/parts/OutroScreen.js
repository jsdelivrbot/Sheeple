import React, { Component } from 'react';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../../public/img/', false, /\.(png|jpe?g|svg|gif)$/));



export class OutroScreen extends Component {

    
    
  render() {
    return (
    <div className="postIntro">
        <p>Je bent een</p>
        <img src={images[this.props.endimage]} className="finalImage"/>
            <h2>{this.props.resultaat}</h2>
        <p>{this.props.text}</p>
        </div>
 );
  }
}