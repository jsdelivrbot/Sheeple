import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FacebookPost} from './components/FacebookPost';
import {FacebookArticle} from './components/FacebookArticle';
import {Header} from './components/Header';
import data from './data.json';
import './index.css';

var currentArtiekel = 1;
    

export default class App extends Component {
    
    constructor(){
        super();
        this.state = {
            geladenArtiekels: currentArtiekel
        }
    }
    MeerArtiekelen(){
        var maxId = getMax(data, "id");
        if(this.state.geladenArtiekels < maxId.id){
         currentArtiekel++;
        console.log(currentArtiekel);
        this.setState({geladenArtiekels: currentArtiekel})
        }
        
    }
    
    
    
  render() {
      
      var arrayPosts = [];
      for (var i = 0; i < this.state.geladenArtiekels; i++){
          if(data[i].typeData === "Post"){
            arrayPosts.push(<FacebookPost MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vraag={data[i].vraag} user={data[i].user}/>
                );  
          }else if(data[i].typeData === "Article"){
              //let image = {require(data[i].image)};
             arrayPosts.push(<FacebookArticle MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vraag={data[i].vraag} user={data[i].user} image={data[i].image} imageTitel={data[i].imageTitel}/>
                ); 
          }
  
        }
    return (
        
        
        
        <div className="bigContainer">
        <div className="smallContainer"> <Header /> </div>
        <div className="smallContainer2"> {arrayPosts} </div>
        </div>
        
        
        
    );
  }
}
function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

ReactDOM.render(<App />, document.getElementById('root'));

