"use strict";
var inquirer = require("inquirer");
var fs = require("fs");
var BasicFlashCard = require("./basicCard.js");
var ClozeFlashCard = require("./clozeCard.js");

inquirer.prompt([
    {
        name:"choice",
        choices: ["Write Card", "Read Cards"],
        type: "list",
        message: "Choose an option:"

    }
]).then(processSelection);

function processSelection(select){

    console.log(select.choice);

    if (select.choice === "Post"){

    whatToPost();
    }
    else{
        whatToBid();
    }

}
