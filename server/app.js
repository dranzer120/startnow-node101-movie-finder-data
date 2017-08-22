const express = require('express');
const morgan = require('morgan')
const axios = require('axios')
const cache = {};

const app = express();
app.use(morgan('combined'))



app.get('/', function(req, res) {

    var i = req.query.i || 'tt3896198' ;
    
    var url = 'http://www.omdbapi.com/?i='+ i + '&apikey=8730e0e';
    
    if(cache.i){
        res.json(cache.i);
        console.log("Using Cache " + i)
    }

    else{
        axios.get(url)
            .then(function(response){
                res.json(response.data)
                console.log("Setting " + i + " as cache")
                cache.i = response.data
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
        }   
            
})


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;

// define a route for /

    // grab "i" from the URL
    // create an HTTP request to OMDBAPI.com using axios
        // respond with data using res.json