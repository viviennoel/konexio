﻿const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('auth');

    //try {
        const token = req.headers.authorization.split(' ')[1];
        console.log('token');
        console.log(token);

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        console.log('decodedtoken');
        console.log(decodedToken);

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    //}
    //catch {
    //    res.status(434).json({
    //        error: new Error('Invalid request!')
    //    });
    //}
};