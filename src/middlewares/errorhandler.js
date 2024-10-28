const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(500).send("unknown error")
    }
    else {
        next();
    }
}

module.exports = { errorHandler };