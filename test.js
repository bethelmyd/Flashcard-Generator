// jsonString = '[{"cloze": "what", "rest": "to do"},{"front": "what", "back": "to do"}]';

// jsonObject = JSON.parse(jsonString);

// console.log(jsonObject);

"use strict";
var readCardExports = require("./readCardInfo.js");
var cardData = new readCardExports['CardRecordDataObject']();
var readCard = new readCardExports['ReadCardObject']();

readCard.readCardsFromFile(cardData);
console.log(cardData.cardDataFromFile);

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

//dumpData(readCard.getData());