const bcrypt = require('bcryptjs'); // to crypt
var jwt = require('jsonwebtoken'); // to make data as a string encoded 
var nodemailer = require('nodemailer');

const userLogin = require('../../model/users');
const gameState = require('../../model/gameStats');
const Friends = require('../../model/friend_list');

// userLogin : redirects to /users if success 
exports.userLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        const transaction = await userLogin.findOne({ $or: [{ "username": req.body.username }, { "email_id": req.body.email_id }] });

        if (!transaction) {
            // returned response
            return res.status(404).json({
                success: false,
                code: 404,
                error: 'User data not found'
            })
        } // returned
        
        // transaction

        bcrypt.compare(req.body.password, transaction.password, function (err, result) {
            if (result) {
                // token to connect
                let token = createUserToken(transaction.email_id, transaction._id);
                // response to return
                let response = {
                    "id": transaction.id,
                    "username": transaction.username,
                    "email": transaction.email_id,
                    "token": token
                }
                // redirection
                res.redirect('/game-menu');
                // return res.status(200).json({
                //     success: true,
                //     data: response
                // })
            } else {
                return res.status(201).json({
                    success: false,
                    code: 201,
                    error: 'Username or password Incorrect'
                });
            }
        });
    } catch (error) { // intrernal server error
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}


// createUserToken
let createUserToken = (email, id) => {
    console.log(email);
    // return with jw (generating using secret_key environement)
    return jwt.sign({
        email: email,
        id: id
    },
        process.env.SECRET_KEY, {
        expiresIn: '21h'
    });
}

// allUsers
exports.allUsers = async (req, res, next) => {
    try {
        console.log(req.body);
        const transaction = await userLogin.find();

        if (!transaction) {
            // return response
            return res.status(404).json({
                success: false,
                code: 404,
                error: 'User not found'
            })
        } // returned 

        // transaction
        let statsInfo = [];
        transaction.map((userInfo, index) => {
            statsInfo.push(getUserStats(userInfo._id));
        })
        Promise.all(statsInfo)
            .then((stats) => {
                // console.log("Games stats",stats)
                let finalResponse = [];
                stats.forEach(statsInfo => {
                    let user_id = statsInfo.user_id;
                    // console.log("Firs loop user_id",user_id)
                    transaction.map((info, index) => {
                        if (user_id == info._id) {
                            // console.log("user_id Maatched",user_id)
                            let result = {
                                "_id": info._id,
                                "email_id": info.email_id,
                                "username": info.username,
                                "picture_url": info.picture_url,
                                "gameStats": statsInfo.data
                            }
                            finalResponse.push(result);
                        } else {
                            let result = {
                                "_id": info._id,
                                "email_id": info.email_id,
                                "username": info.username,
                                "picture_url": info.picture_url,
                                "gameStats": ''
                            }
                            finalResponse.push(result);
                        }
                    })
                })
                res.render('users', { users: finalResponse, title: "users" });
                // return res.status(200).json({
                //     success: true,
                //     data: finalResponse
                // })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) { // internal server error
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}

// getUserStatus
const getUserStats = async (user_id) => {
    try {
        const transaction = await gameState.findOne({ "user_id": user_id });
        return response = {
            "user_id": user_id,
            "data": transaction
        };
    } catch (Err) {
        console.log(Err);
    }
}

// forGotPassword
exports.forGotPassword = async (req, res, next) => {
    try {
        console.log(req.body);
        const transaction = await userLogin.findOne({ "email_id": req.body.email_id });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                code: 404,
                error: 'User data not found'
            })
        } else {
            let fourDigitCode;
            fourDigitCode = 1000 + Math.floor(Math.random() * 9000); // int in [1000..9000]
            let updateCode = {
                "verification_code": fourDigitCode
            }
            await userLogin.updateOne({ "email_id": req.body.email_id }, updateCode);
            // transporter for mail
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SUPPORT_EMAIL, //email address to send from
                    pass: process.env.SUPPORT_PASSWORD //the actual password for that account
                }
            });
            // TODO : have a view for the mail + check if priority works
            let mailOptions;
            mailOptions = {
                from: `"${process.env.SUPPORT_USER_NAME}" <${process.env.SUPPORT_EMAIL}>`,
                name: process.env.SUPPORT_USER_NAME,
                to: req.body.email_id, // list of receivers
                // priority: innerHeight,
                subject: 'Forgot Password',
                //   text: 'Reset Password!',
                html: `<div style='text-align:center'><h3>Hi,</h3>
       \n <span>Please use this code to Reset your Password </span>
       \n <h1 style='letter-spacing:5px;color:#3399ff'>${fourDigitCode}</h1>
       \n <small>Kindly ignore this email if you didnt request for registeration</small></div>`
            };
            // TODO verify code 600 ?
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject({
                        code: 600,
                        message: 'Email server is not responding'
                    })
                }
            });
            return res.status(200).json({
                success: true,
                message: 'Authentication Code Sent to your email address'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        console.log(req.body);
        const transaction = await userLogin.findOne({ "verification_code": req.body.verification_code });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                code: 404,
                error: 'User data not found'
            })
        } else {
            let cryptedPassword = await hashPassword(req.body.password);
            // req.body.password = cryptedPassword;
            let updatePass = {
                "password": cryptedPassword
            }
            await userLogin.updateOne({ "verification_code": req.body.verification_code }, updatePass);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SUPPORT_EMAIL, //email address to send from
                    pass: process.env.SUPPORT_PASSWORD //the actual password for that account
                }
            });
            let mailOptions;
            // TODO : have a view for the mail + check if priority works
            mailOptions = {
                from: `"${process.env.SUPPORT_USER_NAME}" <${process.env.SUPPORT_EMAIL}>`,
                name: process.env.SUPPORT_USER_NAME,
                to: transaction.email_id, // list of receivers
                subject: 'Reset Password',
                // priority: innerHeight,
                //   text: 'Reset Password!',
                html: `<div style='text-align:center'><h3>Hi,</h3>
       \n <span>Password Reset Successfully, Your new password is  </span>
       \n <h1 style='letter-spacing:5px;color:#3399ff'>${req.body.password}</h1>
       \n <small>Kindly ignore this email if you didnt request for registeration</small></div>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject({
                        code: 600,
                        message: 'Email server is not responding'
                    })
                }
            });
            return res.status(200).json({
                success: true,
                message: 'Password Reset Successfully'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}

async function hashPassword(userPassword) {

    const password = userPassword
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

exports.forGotUsername = async (req, res, next) => {
    try {
        console.log(req.query);
        const transaction = await userLogin.findOne({ "email_id": req.query.email_id });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                code: 404,
                error: 'User data not found'
            })
        } else {
            // await userLogin.updateOne({ "email_id": req.body.email_id },updateCode);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SUPPORT_EMAIL, //email address to send from
                    pass: process.env.SUPPORT_PASSWORD //the actual password for that account
                }
            });
            let mailOptions;
            mailOptions = {
                from: `"${process.env.SUPPORT_USER_NAME}" <${process.env.SUPPORT_EMAIL}>`,
                name: process.env.SUPPORT_USER_NAME,
                to: req.query.email_id, // list of receivers
                subject: 'Forgot Password',
                //   text: 'Reset Password!',
                html: `<div style='text-align:center'><h3>Hi,</h3>
       \n <span>Following Username is associated with your account! </span>
       \n <h1 style='letter-spacing:5px;color:#3399ff'>${transaction.username}</h1>
       \n <small>Kindly ignore this email if you didnt request for registeration</small></div>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject({
                        code: 600,
                        message: 'Email server is not responding'
                    })
                }
            });
            return res.status(200).json({
                success: true,
                message: 'Username Sent to your email address'
            })
        }
    } catch (error) { // server internal error
        console.log(error);
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}

exports.getFriendList = async (req, res, next) => {
    try {
        console.log(req.query);
        let transaction = await Friends.find({ "user_id": req.query.user_id });

        let userArry = [];
        console.log("uper friend id", transaction);
        transaction.map((friend, i) => {
            userArry.push(getUserInfo(friend.friend_id))
        })
        Promise.all(userArry)
            .then((userData) => {
                let result = [];
                userData.forEach(user => {
                    let user_id = user.user_id;
                    transaction.forEach((frndList, i) => {
                        if (frndList.friend_id == user_id) {
                            let response = {
                                "_id": frndList._id,
                                "user_id": frndList.user_id,
                                "friend_status": frndList.friend_status,
                                "friendInfo": user.userInfo
                            }
                            result.push(response);
                        }
                    })
                })
                return res.status(200).json({
                    success: true,
                    data: result
                })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) { // server internal error
        console.log("Server Error is ", error);
        //return res.status(500).json({
        //    success: false,
        //    code: 500,
        //    error: 'Server Error'
        //})
    }
}

// getUserInfo
const getUserInfo = async (id) => {
    console.log("friend id is ", id);
    const transaction = await userLogin.findOne({ "_id": id });
    // console.log("User friend is ",transaction);
    let result = {
        "username": transaction.username,
        "emai_id": transaction.email_id,
        "picture": transaction.picture_url
    }
    return response = {
        "user_id": id,
        "userInfo": result
    }
}
