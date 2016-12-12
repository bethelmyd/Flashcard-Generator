"use strict";
var inquirer = require("inquirer");
var fs = require("fs");
var BasicFlashCard = require("./basicCard.js");
var ClozeFlashCard = require("./clozeCard.js");
var CardDeck = require("./CardDeck.js");

function mainMenu()
{
    inquirer.prompt([
        {
            name:"choice",
            choices: ["Write Card", "Read Cards"],
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
    else{
        readCards();
    }

}

function whichTypeOfCard()
{
    inquirer.prompt([
        {
            name: "cardType",
            message: "Which type of card would you like to create? ",
            type: "list",
            choices: ["Basic", "Cloze"]
        }
    ]).then(getCardInfo);

}


function readCards()
{

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
        ]).then(writeToFile);
    }
    else{
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
        ]).then(writeToFile);        
    }

}

function writeToFile(item){

    console.log(item);
}

mainMenu();