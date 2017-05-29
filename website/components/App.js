import React, { Component } from 'react';
import {FacebookPost} from './parts/FacebookPost';
import {FacebookArticle} from './parts/FacebookArticle';
import {Header} from './parts/Header';
//import data from 'json!./data.json';
import io from 'socket.io-client';


var currentArtiekel = 1;

//object maken


export default class App extends Component {
    
    
    constructor(){
        super();
        this.state = {
            start: false,
            geladenArtiekels: currentArtiekel,
            vragen: {}
        }
    }
    componentDidMount() {
       this.socket = io();
        this.socket.on('connect', () => {
			console.log('Connected: ', this.socket.id);
		});
        this.socket.on('vragen', (oVragen) => {
            this.setState({vragen: oVragen});
            this.setState({start: true});
		});
        this.socket.on('updateLike', (vraagUpdate) => {
            
            let id = vraagUpdate.id;
        let oData = vraagUpdate.likes;
        let orData = this.state.vragen[id].likes;
        this.state.vragen[id].likes = oData;
        this.setState({orData});
        });
        this.socket.on('updateDislike', (vraagUpdate) => {
            console.log(vraagUpdate);
            let id = vraagUpdate.id;
        let oData = vraagUpdate.dislikes;
        let orData = this.state.vragen[id].dislikes;
        this.state.vragen[id].dislikes = oData;
        this.setState({orData});
        });
         
  };

    
    MeerArtiekelen(){
        var maxId = getMax(this.state.vragen, "id");
        if(this.state.geladenArtiekels - 1 < (maxId.id)){
         currentArtiekel++;
        //console.log(currentArtiekel);
        this.setState({geladenArtiekels: currentArtiekel});
        }
        
    }
    likeArtiekel(id){
        //console.log(id):
        
        this.socket.emit('like',this.state.vragen[id].id,this.socket.id);
    }
    dislikeArtiekel(id){
        //console.log(id):
        this.socket.emit('dislike',this.state.vragen[id].id,this.socket.id);
    }
    
    
    
  render() {
      var arrayPosts = [];
      for (var i = 0; i < this.state.geladenArtiekels; i++){
          if(this.state.start){
          if(this.state.vragen[i].typeData === "Post"){
            arrayPosts.push(<FacebookPost likeArtiekel={this.likeArtiekel.bind(this)} dislikeArtiekel={this.dislikeArtiekel.bind(this)} MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vragen={this.state.vragen[i]} vraag= {this.state.vragen[i].vraag} user={this.state.vragen[i].user} likes={this.state.vragen[i].likes} dislikes={this.state.vragen[i].dislikes}/>
                );  
          }else if(this.state.vragen[i].typeData === "Article"){
              //let image = {require(data[i].image)};
             arrayPosts.push(<FacebookArticle likeArtiekel={this.likeArtiekel.bind(this)} dislikeArtiekel={this.dislikeArtiekel.bind(this)} MeerArtiekelen={this.MeerArtiekelen.bind(this)} key={i} vragen={this.state.vragen[i]} vraag={this.state.vragen[i].vraag} user={this.state.vragen[i].user} image={this.state.vragen[i].image} imageTitel={this.state.vragen[i].imageTitel} likes={this.state.vragen[i].likes} dislikes={this.state.vragen[i].dislikes}/>
                ); 
          }
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


