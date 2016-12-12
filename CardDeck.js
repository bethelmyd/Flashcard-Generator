"use strict";

var BasicFlashCard = require("./basicCard.js");
var ClozeFlashCard = require("./clozeCard.js");

var CardDeck = function()
{
    this.cards = [];
    this.addCard = function(card){
        this.cards.push(card);
    };
    this.mergeDecks = function(otherDeck)
    {
        //attach the array in the other deck to the end of the array in this deck
        this.cards = this.cards.concat(otherDeck.getCards());
  //      console.log(JSON.parse(JSON.stringify(this.getCards())));
        return this;
    };
    this.getCard = function(index){
        if(index < 0 || index >= this.cards.length) return null;
        return this.cards[index];
    };
    this.getNumCards = function(){
        return this.cards.length;
    };
    this.getCards = function(){
        return this.cards;
    };
    this.clearDeck = function(){
        this.cards = [];
    };
};

module.exports = CardDeck;

// var deck = new CardDeck();
// var card = new BasicFlashCard("Name a 70's group from Sweden?", "ABBA");
// deck.addCard(card);
// card = new BasicFlashCard("Name a 70's group from Sweden?", "ABBA");
// deck.addCard(card);
// card = new ClozeFlashCard("ABBA", "is a 70's group from Sweden.");
// deck.addCard(card);
// var cards = deck.getCards();
// for(var card of cards){
//     console.log(JSON.parse(JSON.stringify(card)));
// }
