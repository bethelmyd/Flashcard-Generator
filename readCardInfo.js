"use strict";
//var inquirer = require("inquirer");
var fs = require("fs");
//var BasicCard = require("./basicCard.js");
//var ClozeCard = require("./clozeCard.js");

var CardRecordDataObject = function(){
    this.cardDataFromFile = [];
}



var ReadCardObject = function()
{
    this.readCardsFromFile = function()
    {
        fs.readFile("basicCard.txt", "utf8", processCards);
    };

    function processCards(err, data) {
        if (err) {
            console.log("Error reading card file: " + err);
            process.exit(2);
        }
        var cardRecordObject = new CardRecordDataObject();
        cardRecordObject.cardDataFromFile.push(data);
        //dumpData(data);
    }

    function dumpData(data){
        // console.log(data);
        // console.log("**********");
        var cardObjectArray = JSON.parse(data);
        for(var i = 0; i < cardObjectArray.length; i++)
        {
            var cardObject = cardObjectArray[i];
            for(var card in cardObject)
            {
                console.log(card + ": " + cardObject[card]);
            }

            console.log("*****************");

        }    
    }

}

//readCardsFromFile();

module.exports = {
    ReadCardObject: ReadCardObject, 
    CardRecordDataObject: CardRecordDataObject
};