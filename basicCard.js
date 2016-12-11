"use strict";
var fs = require("fs");

var basicCards = [];

var BasicFlashCard = function (front, back){
    this.front = front;
    this.back = back;
    this.addCard = function(){
        var jsonObjectString = "{";
        jsonObjectString += '"front":"' + this.front + '","back":"' + this.back + '"';
        jsonObjectString += "}";
        basicCards.push(jsonObjectString);
    };
    this.saveCards = function(){
        var path = "./basicCard.txt";
        console.log(basicCards);
        var cardObjectArrayString = "[" + basicCards.toString() + "]";  //convert to an array of JSON objects
        fs.appendFile(path,cardObjectArrayString,handleError);
    };

    this.getCards = function(){
        return cards;
    };
    
    function handleError(err){
        if(err){
            console.log("Basic flash card write error: " + err);
            process.exit(1);
        }
    };
};

module.exports = BasicFlashCard;

// var basicCard = new BasicFlashCard("Name a 70\'s group from Sweden?", "ABBA");
// basicCard.addCard();
// basicCard = new BasicFlashCard("Name a 70\'s group from Sweden?", "ABBA");
// basicCard.addCard();
// basicCard = new BasicFlashCard("Name a 70\'s group from Sweden?", "ABBA");
// basicCard.addCard();
// basicCard.saveCards();

