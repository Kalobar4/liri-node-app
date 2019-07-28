// Dependency Files and Global Variables
require("dotenv").config();
const axios = require('axios');
var keys = require("./keys.js");
var song = process.argv[3];
var argument2 = process.argv[2];
var queryString = process.argv.slice(3,10).join('+');
console.log(queryString, '***************')
var Spotify = require('node-spotify-api');
var fs = require("fs");
//  var spotify = new Spotify(keys.spotify);


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
            console.log('Venue Name: ', response.data[0].venue.name);
            console.log('Venue City: ', response.data[0].venue.city);
            console.log('Concert Date: ', response.data[0].datetime);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
};

function spotifyFunction() {
    if (!process.argv[3]) { song = 'TheSign' };
    spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    // console.log('the song is ', song)
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.href);
        console.log(data.tracks.items[0].album.name);
    });

};

function movieFunction() {
    // console.log('movie-this', song);
    if (!process.argv[3]) { song = 'mr.nobody' };
    axios.get("http://www.omdbapi.com/?t=" + song + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
          //  console.log(response.data);
            console.log('Title: ', response.data.Title);
            console.log('Year: ', response.data.Year);
            console.log('IMDB Rating: ', response.data.imdbRating);
            console.log('RT Rating: ',response.data.Ratings[0]);   // Rotten Tomatoes Rating of the movie.
            console.log('Country: ', response.data.Country);
            console.log('Language: ', response.data.Language);
            console.log('Plot: ', response.data.Plot);
            console.log('Actors: ', response.data.Actors);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
};

function randomFunction() {
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        dataArr = data.split(",");
        randomRequest = dataArr[0]
        randomSong = dataArr[1].replace(/['"]+/g, '')
        process.argv[3] = randomSong;

        console.log('Random request is: ', dataArr[0])
        console.log('Random song is : ', dataArr[1].replace(/['"]+/g, ''))
        // userInput(randomRequest, randomSong);
        ///  in lieu of callback above ///
        spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        });
        spotify.search({ type: 'track', query: randomSong }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].album.href);
            console.log(data.tracks.items[0].album.name);
        });

    });
};

userInput(argument2, queryString);   // This calls the main function  //
