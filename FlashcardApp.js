"use strict";
var inquirer = require("inquirer");
var fs = require("fs");
var BasicFlashCard = require("./basicCard.js");
var ClozeFlashCard = require("./clozeCard.js");
var CardDeck = require("./CardDeck.js");

var deck = new CardDeck();

function mainMenu()
{
    inquirer.prompt([
        {
            name:"choice",
            choices: ["Write Card", "Read Cards", "Exit"],
            type: "list",
            message: "Please make a choice:"

        }
    ]).then(processSelection);
}

function processSelection(whatToDo){

    //console.log(whatToDo.choice);

    if (whatToDo.choice === "Write Card"){
        whichTypeOfCard();
    }
    else if (whatToDo.choice === "Read Cards"){
        readCards();
    }
    else{
        console.log("Bye!");
        process.exit(0);
    }

}

function whichTypeOfCard()
{
    inquirer.prompt([
        {
            name: "cardType",
            message: "Which type of card would you like to create? (Select none to quit data entry.)",
            type: "list",
            choices: ["Basic", "Cloze", "None"]
        }
    ]).then(getCardInfo);

}

function getCardInfo(whichTypeOfCard){

    if(whichTypeOfCard.cardType == "Basic")
    {
        inquirer.prompt([
            {
                name: "front",
                message: "Enter your question: ",
                type: "input"
            },
            {
                name: "back",
                message: "Enter the answer: ",
                type: "input",
            
            }
        ]).then(addBasicToDeck);
    }
    else if (whichTypeOfCard.cardType == "Cloze"){
        inquirer.prompt([
            {
                name: "cloze",
                message: "Enter the cloze (hidden part) of the statement: ",
                type: "input"
            },
            {
                name: "rest",
                message: "Enter the rest of the statement (without the ...): ",
                type: "input",
            
            }
        ]).then(addClozeToDeck);        
    }
    else{
        writeToFile();
    }

}

function addBasicToDeck(item){
    var basicCard = new BasicFlashCard(item.front, item.back);
    //console.log(JSON.parse(JSON.stringify(basicCard)));
    deck.addCard(basicCard);
    whichTypeOfCard();
}

function addClozeToDeck(item){
    var clozeCard = new ClozeFlashCard(item.cloze, item.rest);
    //console.log(JSON.parse(JSON.stringify(clozeCard)));
    deck.addCard(clozeCard);
    whichTypeOfCard();
}

function writeToFile(){
    //Read everything in from file first because if we append to file with this data format, it will screw up the JSON object
    fs.readFile("cards.txt", "utf8", mergeArrays);

    function mergeArrays(err, data)  //this 
    {
        if(err)
        {
            console.log("Error reading card file: " + err);
            process.exit(2);
        }
        if(data !== null && data.length != 0 )
        {
            var cardDataFromFile = JSON.parse(data);
            var oldDeck = new CardDeck();
            for(var i = 0; i < cardDataFromFile.length; i++)
            {
                var cardObject = cardDataFromFile[i];
                var card = null;
                if(cardObject.hasOwnProperty('front')){
                    card = new BasicFlashCard(cardObject['front'], cardObject['back']);
                }
                else{
                    card = new ClozeFlashCard(cardObject['cloze'], cardObject['rest']);
                }
                
                oldDeck.addCard(card);
            }//end loop
            // console.log(JSON.parse(JSON.stringify(oldDeck.getCards())));
            // console.log(JSON.parse(JSON.stringify(deck.getCards())));
            
            //attach new deck to old deck and replace deck with merged deck
            // if (deck == null)
            //     deck = oldDeck;
            // else
                deck = oldDeck.mergeDecks(deck);

//            console.log(JSON.parse(JSON.stringify(deck.getCards())));
        }

        //console.log(JSON.parse(JSON.stringify(deck.getCards())));
        fs.writeFile("cards.txt",JSON.stringify(deck.getCards()), function(err){
            if(err){
                console.log("Flash card write error: " + err);
                process.exit(1);
            }
            //clear the current deck for the next time
            deck.clearDeck();
            mainMenu();
        });
    }
}


function readCards()
{
        fs.readFile("cards.txt", "utf8", processCards);

        function processCards(err, data) {
            if (err) {
                console.log("Error reading card file: " + err);
                process.exit(2);
            }
            if(data !== null && data.length != 0 )
            {
                var cardDataFromFile = JSON.parse(data);
            // console.log(cardDataFromFile);
                for(var i = 0; i < cardDataFromFile.length; i++)
                {
                    var cardObject = cardDataFromFile[i];
                // console.log(JSON.parse(JSON.stringify(cardObject)));
                for (var card in cardObject)
                    {
                        console.log(card + ": " + cardObject[card]);
                    }
                    console.log("-----------------------");
                }
                console.log("*********************");
            }
            else{
                console.log("There is no card data in the file.");
            }
             mainMenu();
        }

}

mainMenu();