// Dependency Files and Shared Variables
require("dotenv").config();
const axios = require('axios');
var keys = require("./keys.js");
var song = process.argv[3];
var argument2 = process.argv[2];



//var spotify = new Spotify(keys.spotify);

// UI: Command Line Interface Function

function userInput(argument2, song) {
    switch (argument2) {
        case "concert-this": concertFunction();
            break;

        case "spotify-this-song": spotifyFunction(song);
            break;

        case "movie-this": movieFunction(song);
            break;

        case "do-what-it-says": randomFunction(song);
            break;

        default: console.log(`${argument2} and ${song} is not valid query combination`)

    }
};


// Remote Server Calls & Callback functions 
function concertFunction() {
    // console.log('concert-this', song);
    axios.get("https://rest.bandsintown.com/artists/" + song + "/events?app_id=codingbootcamp")
    .then(function (response) { 
        console.log(response.data[0].venue.name); 
        console.log(response.data[0].venue.city); 
        console.log(response.data[0].datetime); 
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });
};


// * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

function spotifyFunction() { console.log('spotify-this-song', song) };
function movieFunction() {
    console.log('movie-this', song);
};

function randomFunction() { console.log('do-what-it-says', song) };

userInput(process.argv[2], song);
