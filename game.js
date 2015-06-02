
/**
 * Created by tstuart on 6/1/15.
 */


// the game engine will have a game state
var GameEngine = function() {

    this.WORDS = [
        "word", "letter", "number", "person", "pen", "class", "people",
        "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
        "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
        "land", "home", "hand", "house", "picture", "animal", "mother", "father",
        "brother", "sister", "world", "head", "page", "country", "question",
        "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
        "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
        "west", "child", "children", "example", "paper", "music", "river", "car",
        "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
        "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
        "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
        "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
        "space"
    ];

    this.drawerID = null;
    this.players = new Object();
    this.currentWord = null;
    this.setWord();
    this.drawList = [];

};

GameEngine.prototype.addPlayer = function(id, nickName) {
    this.players[id] = nickName;

    // if the game state drawerID is null, make this
    // player the drawer
    if (!this.drawerID) {
        this.drawerID = id;
    }
};

GameEngine.prototype.removePlayer = function(id) {
    if (!this.players[id]) {
        return;
    }

    delete this.players[id];

    // check to see if it was the drawer that is being removed
    // if so (and there is still more
    if (id === this.drawerID) {

        if (Object.keys(this.players).length > 0) {
            // make the first object the drawer
            for(var index in this.players) {
                this.drawerID = index;
                break;
            }

        } else {
            // out of players, set drawerID to null
            this.drawerID = null;
        }
    }
};

GameEngine.prototype.setDrawer = function(id) {
    this.drawerID = id;
};

GameEngine.prototype.setWord = function() {
    // get a random index for the word array
    var rndNum = Math.floor((Math.random() * (this.WORDS.length - 1)));
    this.currentWord = this.WORDS[rndNum];
};

GameEngine.prototype.addDrawPosition = function(position) {
    this.drawList.push(position);
};

GameEngine.prototype.clearDrawList = function() {
    this.drawList = [];
};

GameEngine.prototype.getGameInfo = function() {
    return {
        drawerID: this.drawerID,
        currentWord: this.currentWord,
        players: this.players
    }
};

GameEngine.prototype.isGuessCorrect = function(guess) {
    return (this.currentWord.toUpperCase() === guess.toUpperCase())
};

//var ge = new GameEngine();
//console.log(ge.currentWord);

exports.GameEngine = GameEngine;
