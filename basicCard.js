"use strict";

var BasicFlashCard = function (front, back){
    this.front = front;
    this.back = back;
    this.getFront = function(){
        return this.front;
    };

    this.getBack = function(){
        return this.back;
    };
};

module.exports = BasicFlashCard;

//basicCard.saveCards();

