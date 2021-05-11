const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');
const ObjectId = require('mongodb').ObjectId;

//Signing up an user (creating his profile)
exports.signupUser = (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));

    //verify the informations
    if (!req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email) === false ||
        req.body.password !== req.body.passwordConfirm ||
        !req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) ||
        !req.body.status ||
        req.file.filename === null ||
        req.body.cgu === false ||
        req.body.newsletter === null
    ) {
        return res.status(410).json({error:"There is an error in the form"});
    } else {
        //Encrypt the password
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    status: req.body.status,
                    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    newsletter: req.body.newsletter
                });

                //Save the user in MongoDB
                user.save()
                    .then(() => res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    }))
                    .catch(error => 
                        {
                            res.status(400).json({ error:"This Email is taken already" })
                        });
            })
            .catch(error => res.status(510).json({ error }));
    }
};

//Login user function
exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.user.email }).select('password')
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt.compare(req.body.user.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }

                    //If the password is correct, we send the firstname, the token and userId as response
                    User.findOne({ email: req.body.user.email })
                        .then(user => {
                            res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                            ),
                            firstname: user.firstname,
                            status: user.status
                            })
                        })
                        .catch(error => res.status(500).json({ error }))
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//GET ALL USERS
exports.usersGetAll = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let userId = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

    //Check if the user is entitled - Not needed for us as everyone can see but good practice
    User.findOne({ _id: userId.userId })
        .then(
            (response) => {
                if (!response) {
                    return res.status(405).json({ message: 'user doesnt exist' });
                } else {

                    //Is the user entitled to display all the members of the team? - if yes...
                    User.find()
                        .then(
                            (response) => {
                                if (!response) {
                                    return res.status(405).json({ message: 'There is no user Konexio!' });
                                } else {
                                    res.status(200).json(response);
                                }
                            })
                        .catch(
                            () => {
                                res.status(500).send(new Error('Database error!'));
                            }
                        )
                }
            })
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
};

//DELETE AN USER
exports.deleteUser = (req, res, next) => {
    let o_id = new ObjectId(req.params.ProductId);

    User.deleteOne({ _id: o_id })
        .then(
            (user) => {
                if (!user) {
                    return res.status(405).json({ message: 'no order saved' });
                } else {
                    res.status(200).json(user);
                }
            })
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
}

//GET USER
exports.userGet = (req, res, next) => {

    User.findOne({ _id: req.params.userId }).then(
        (response) => {
            if (!response) {
                return res.status(405).json({ message: 'user doesnt exist' });
            } else {
                res.status(200).json(response);
            }
        })
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
};

//UPDATE PROFILE
exports.userUpdate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let userId = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

    //Find the user we wish to modify in order to user the database
    User.findOne({ _id: userId.userId }).select('password')
        .then(
            (response) => {
                if (!response) {
                    return res.status(405).json({ message: 'user doesnt exist' });
                } else {

                    //Update user
                    User.updateOne(
                        { _id: req.params.userId },
                        {
                            ...req.body,
                            password: response.password,
                            _id: req.params.userId
                        }
                    ).then((response) => {
                        res.status(200).json(response)
                    })
                        .catch(error => res.status(400).json({ error }));
                }
            })
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
}

//UPDATE PROFILE PICTURE
exports.userUpdatePicture = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let userId = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

    //Find user to be updated
    User.findOne({ _id: userId.userId }).select('password')
        .then(
            (response) => {
                if (!response) {
                    return res.status(405).json({ message: 'user doesnt exist' });
                } else {
                    let file = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.file;

                    //build the response for redux
                    const token = req.headers.authorization.split(' ')[1];
                    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
                    let toState = {
                        userId: decodedToken.userId,
                        token: token,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        status: req.body.status,
                        picture: file,
                        newsletter: req.body.newsletter,
                        email: req.body.email,
                        password: "This is not shared",
                    }

                    User.updateOne(
                        { _id: req.params.userId },
                        {
                            ...req.body,
                            picture: file,
                            password: response.password,
                            _id: req.params.userId
                        }
                    ).then(() => {
                        res.status(200).json(toState)
                    })
                        .catch(error => res.status(400).json({ error }));
                }
            })
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
}