const adminAuthentication = (req, res, next) => {
    const token = 'fz17';
    const adminAuth = token === 'fz17';

    if (!adminAuth) {
        res.status(404).send('something went wrong');
    }
    else {
        next();
    }

}

module.exports = { adminAuthentication }