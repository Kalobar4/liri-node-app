// Dependency Files and Shared Variables
require("dotenv").config();
const axios = require('axios');
var keys = require("./keys.js");
var song = process.argv[3];
var argument2 = process.argv[2];
var queryString = process.argv.slice(3).join('');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


///  MAIN FUNCTION FOR  UI: Command Line Interface Function   ///
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
        console.log('Venue Name: ',response.data[0].venue.name); 
        console.log('Venue City: ',response.data[0].venue.city); 
        console.log('Concert Date: ',response.data[0].datetime); 
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });
};

function spotifyFunction() { 
    if (!process.argv[3]){song = 'TheSign'};
    var spotify = new Spotify({
           id: process.env.SPOTIFY_ID,
         secret: process.env.SPOTIFY_SECRET
       });
       
    spotify.search({ type: 'track', query: song }, function(err, data) {
     if (err) {
      return console.log('Error occurred: ' + err);
        }

     console.log(data.tracks.items[0].name); 
     console.log(data.tracks.items[0].album.external_urls.spotify); 
    //  console.log(data.tracks.items[0].album); 
       });

};


// Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

function movieFunction() {
    // console.log('movie-this', song);
    if (!process.argv[3]){song = 'mr.nobody'};
    axios.get("http://www.omdbapi.com/?t=" + song + "&y=&plot=short&apikey=trilogy")
    .then(function (response) { 
        console.log('Year: ',response.data.Year); 
        console.log('IMDB Rating: ',response.data.imdbRating); 
        // console.log('RT Rating: ',response.data.RRTRating);   // Rotten Tomatoes Rating of the movie.
        console.log('Country: ',response.data.Country); 
        console.log('Language: ',response.data.Language); 
        console.log('Plot: ',response.data.Plot); 
        console.log('Actors: ',response.data.Actors); 
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });
};

function randomFunction() { console.log('do-what-it-says', song) };



userInput(argument2, queryString);   // This calls the main function  //
