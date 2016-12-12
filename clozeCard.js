"use strict";

var ClozeFlashCard = function (cloze, rest){
    this.cloze = cloze;
    this.rest = rest;
    this.getCloze = function(){
        return this.cloze;
    }
    this.getNonClozePart = function(){
        return "..." + this.rest;
    };
};

module.exports = ClozeFlashCard;
