import React, {Component} from 'react';
import {FacebookPost} from './parts/FacebookPost';
import {FacebookArticle} from './parts/FacebookArticle';
import {Header} from './parts/Header';
import {IntroScreen} from './parts/IntroScreen';
import {OutroScreen} from './parts/OutroScreen';
//import data from 'json!./data.json';
import io from 'socket.io-client';
var currentArtiekel = 1;

var gebruiker = {
    s:0,
    d:0,
    g:0
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            start: false,
            geladenArtiekels: currentArtiekel,
            vragen: {},
            Scherm: 1,
            resultaatGebruiker: ""
        }
    }
    componentDidMount() {
        this.socket = io();
        this.socket.on('connect', () => {
        });
        this.socket.on('vragen', (oVragen) => {
            this.setState({
                vragen: oVragen
            });
            this.setState({
                start: true
            });
        });
        this.socket.on('updateLike', (vraagUpdate) => {

            let id = vraagUpdate.id;
            let oData = vraagUpdate.likes;
            let orData = this.state.vragen[id].likes;
            this.state.vragen[id].likes = oData;
            this.setState({
                orData
            });
        });
        this.socket.on('updateDislike', (vraagUpdate) => {
            let id = vraagUpdate.id;
            let oData = vraagUpdate.dislikes;
            let orData = this.state.vragen[id].dislikes;
            this.state.vragen[id].dislikes = oData;
            this.setState({
                orData
            });
        });

    };
    MeerArtiekelen() {
        var maxId = getMax(this.state.vragen, "id");
        if (this.state.geladenArtiekels - 1 < (maxId.id)) {
            currentArtiekel++;
            this.setState({
                geladenArtiekels: currentArtiekel
            });
            
        }else{
            
            this.setState({Scherm: 3});
        }
    }
    BerekenResultaat(){
        var largest = Math.max.apply(Math, [gebruiker.s,gebruiker.d,gebruiker.g]);
            if(largest === gebruiker.s){
                this.setState({
                resultaatGebruiker: "Sheep"});
                
            }else if(largest === gebruiker.d){
                this.setState({
                resultaatGebruiker: "Denker"});
            }else if(largest === gebruiker.g){
                this.setState({
                resultaatGebruiker: "Goedgelovig"});
                
            }
            console.log(largest);
    }
    
    likeArtiekel(id) {

        this.socket.emit('like', this.state.vragen[id].id, this.socket.id);
        let sheep = this.state.vragen[id].lsheep;
        let denker = this.state.vragen[id].ldenker;
        let goedgelovig = this.state.vragen[id].lgoedgelovig;
        
        gebruiker.s += sheep;
        gebruiker.d += denker;
        gebruiker.g += goedgelovig;
        console.log(gebruiker);
        this.BerekenResultaat();
    }
    dislikeArtiekel(id) {
        //console.log(id):
        this.socket.emit('dislike', this.state.vragen[id].id, this.socket.id);
        let sheep = this.state.vragen[id].dsheep;
        let denker = this.state.vragen[id].ddenker;
        let goedgelovig = this.state.vragen[id].dgoedgelovig;
        
        gebruiker.s += sheep;
        gebruiker.d += denker;
        gebruiker.g += goedgelovig;
        console.log(gebruiker);
        this.BerekenResultaat();
    }
    clickButton() {
        this.setState({
            Scherm: 2
        });
    }
    render() {
        //Voor dit project is het een gepaste oplossing om telkens wat er gerenderd moet worden in een array te plaatsen.
        //Dit omdat er bij de posts meerdere componenten moeten gerenderd worden dus hier komt de array van pas.
        var arrayPosts = [];
        if (this.state.Scherm == 1) {
            //de array wordt telkens gereset
            arrayPosts = [];
            arrayPosts.push( < IntroScreen key = "intro" clickButton = {this.clickButton.bind(this)}
                />
            );
        } else if (this.state.Scherm == 2) {
            for (var i = 0; i < this.state.geladenArtiekels; i++) {
                if (this.state.start) {
                    if (this.state.vragen[i].typeData === "Post") {
                        arrayPosts.push( < FacebookPost likeArtiekel = {this.likeArtiekel.bind(this)} dislikeArtiekel = {this.dislikeArtiekel.bind(this)} MeerArtiekelen = {this.MeerArtiekelen.bind(this)} key = {i} vragen = {this.state.vragen[i]} vraag = {this.state.vragen[i].vraag} user = {this.state.vragen[i].user}likes = {this.state.vragen[i].likes} dislikes = {this.state.vragen[i].dislikes} postImage = {this.state.vragen[i].postImg}
                            />
                        );
                    } else if (this.state.vragen[i].typeData === "Article") {
                        //let image = {require(data[i].image)};
                        arrayPosts.push( < FacebookArticle likeArtiekel = {this.likeArtiekel.bind(this)} dislikeArtiekel = {this.dislikeArtiekel.bind(this)} MeerArtiekelen = {this.MeerArtiekelen.bind(this)} key = {i} vragen = {this.state.vragen[i]} vraag = {this.state.vragen[i].vraag} user = {this.state.vragen[i].user}image = { this.state.vragen[i].image} imageTitel = {this.state.vragen[i].imageTitel} likes = {this.state.vragen[i].likes} dislikes = {this.state.vragen[i].dislikes} postImage = {this.state.vragen[i].postImg}
                            />
                        );
                    }
                }

            }
        } else if (this.state.Scherm == 3) {
            //laatste scherm
            arrayPosts = [];
            arrayPosts.push( <OutroScreen key="outro" resultaat = {this.state.resultaatGebruiker} 
                            />
            );
        }


        return ( 
            < div className = "bigContainer">
            < div className = "smallContainer"> <Header />< /div> 
            < div className = "smallContainer2"> {arrayPosts} < /div> 
            < /div>
        );
    }
}

function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}
