import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from 'socket.io';
import {FacebookPost} from './app/components/FacebookPost';
import {FacebookArticle} from './app/components/FacebookArticle';
import {Header} from './app/components/Header';
import data from './data.json';
import './index.css';


var currentArtiekel = 1;





//object maken
var appVragen = data;
console.log(appVragen[0].likes);

export default class App extends Component {
    state = {users: []}
    
    constructor(){
        super();
        this.state = {
            geladenArtiekels: currentArtiekel
        }
        fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
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
          if(appVragen[i].typeData === "Post"){
            arrayPosts.push(<FacebookPost MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vragen={appVragen[i]} vraag= {appVragen[i].vraag} user={appVragen[i].user} likes={appVragen[i].likes} dislikes={appVragen[i].dislikes}/>
                );  
          }else if(data[i].typeData === "Article"){
              //let image = {require(data[i].image)};
             arrayPosts.push(<FacebookArticle MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vraag={appVragen[i].vraag} user={appVragen[i].user} image={appVragen[i].image} imageTitel={appVragen[i].imageTitel} likes={appVragen[i].likes} dislikes={appVragen[i].dislikes}/>
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

