var fs = require("fs");

var clozeCards = [];

var ClozeFlashCard = function (cloze, rest){
    this.cloze = cloze;
    this.rest = rest;
    this.addCard = function(){
        var jsonObjectString = "{";
        jsonObjectString += '"cloze":"' + this.cloze + '","rest":"...' + this.rest + '"';
        jsonObjectString += "}";
        clozeCards.push(jsonObjectString);
    };
    this.getRest = function(){

    };
    this.saveCards = function(){
        var path = "./clozeCard.txt";
        console.log(clozeCards);
        var cardObjectArrayString = "[" + clozeCards.toString() + "]";  //convert to an array of JSON objects
        fs.appendFile(path,cardObjectArrayString,handleError);
    };
    
    function handleError(err){
        if(err){
            console.log("Basic flash card write error: " + err);
            process.exit(1);
        }
    };
};

module.exports = ClozeFlashCard;

// var clozeCard = new ClozeFlashCard("ABBA", "is a 70\'s group from Sweden?");
// clozeCard.addCard();
// clozeCard = new ClozeFlashCard("ABBA", "is a 70\'s group from Sweden?");
// clozeCard.addCard();
// clozeCard = new ClozeFlashCard("ABBA", "is a 70\'s group from Sweden?");
// clozeCard.addCard();
// clozeCard.saveCards();
