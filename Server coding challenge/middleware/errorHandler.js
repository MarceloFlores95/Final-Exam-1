function errorHandler(req, res) {
    if(req == 406) {
        res.statusMessage = "Id is missing in the body of the request."
        return res.status(406).end()
    }

    if(req == 409) {
        res.statusMessage = "id and movie_ID do not match."
        return res.status(409).end()
    }

    if(req == 403) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list."
        return res.status(403).end()
    }
}

module.exports = errorHandler;