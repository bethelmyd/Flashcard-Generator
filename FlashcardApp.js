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
        mainMenu();
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
    console.log(deck.getCards());
}


function readCards()
{

}



mainMenu();