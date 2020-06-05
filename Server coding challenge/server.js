const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler')
const {Actors} =require('./models/actor-model')
const {Movies} = require('./models/movie-model')

const app = express();

/* 
    Your code goes here 
*/

app.delete('/api/delete-movie-actor/:movie_ID', jsonParser,(req,res) => {
    let movie_ID_params = req.params.movie_ID
    let movie_ID_body = req.body.movie_ID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let actorID = ''

    if(!movie_ID_body) {
        errorHandler(406,res)
    }

    
    if(movie_ID_params != movie_ID_body) {
        errorHandler(409,res)
        
    }
    
    if(!firstName || !lastName) {
        errorHandler(403,res)
    }
    Actors
    .getActorByName(firstName,lastName)
        .then( response => {
           if(response != null) {
               actorID = response.actor_ID
               Movies.
               getMovieByID(Number(movie_ID_body))
               .then(responseMovie => {
                if (responseMovie != null) {
                    Movies.
                        removeActorFromMovieList(movie_ID_body,actorID)
                        .then(responseRemove => {
                            console.log(responseRemove)
                            return res.status(201).end()
                        })
                        .catch(err => {
                            res.statusMessage = "The actor or movie do not exist"
                            return res.status(404).end()
                        })
                        
                    
                }
                else {
                    throw new Error ("Error")
                }
                
               })
               .catch(err => {
                res.statusMessage = "The actor or movie do not exist"
                return res.status(404).end()
            })
           } else {
            throw new Error ("Error")
           }
           
    
        })
        .catch(err => {
            res.statusMessage = "The actor or movie do not exist"
            return res.status(404).end()
        })


    
    
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});