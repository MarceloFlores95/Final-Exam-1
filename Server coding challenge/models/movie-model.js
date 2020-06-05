const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieByID: function (movieID) {
        return moviesCollection
                .findOne({movie_ID:movieID})
                .then(movieResponse => {
                    return movieResponse
                }).catch( err => {
                    throw new Error( err );
                });
    },
    removeActorFromMovieList: function (movieID,actorID) {
        return moviesCollection
            .updateOne({movie_ID: movieID}, {pull:{'actors':actorID}})
            .then(removeResponse => {
                console.log("hola")
                return removeResponse
            }).catch( err => {
                throw new Error( err );
            });
    }
    /*
        Your code goes here
    */
}

module.exports = {
    Movies
};

