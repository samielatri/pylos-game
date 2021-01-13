const express = require('express');

const router = express.Router();

const { registerUser, updateProfile } = require('../../controller/user/signup');
const { addGameStats, updateGameStats } = require('../../controller/game/game');
const { friendRequest, acceptRequest, changeFriendStatus } = require('../../controller/friends/friends');

var fileUpload = require('../../controller/user/file-upload');

// get routes

//router.route('/index')
//.get(mainMenu);


/************************ POST routes ************************/

// POST sign up
router.route('/signup')
.post(registerUser);

// POST game stats
router.route('game')
.post(addGameStats);

// POST send friend request
router.route('send-request')
.post(friendRequest);

// POST accept friend request
router.post(`accept-request`, function (req, res, next) {
    console.log(req.body);
     acceptRequest(req.body)
         .then((data) => {
             res.status(200).json(data);
         })
         .catch((err) => {
             res.json(err);
         })
     // console.log("file name is",file);
 
 });

// POST friend status
router.post(`friend-status`, function (req, res, next) {
    // console.log(req.body);
    changeFriendStatus(req.body)
         .then((data) => {
             res.status(200).json(data);
         })
         .catch((err) => {
             res.json(err);
         })
     // console.log("file name is",file);
 
 });


/*********************** PUT routes *************************/

// not used yet !
// router.route('update_profile',fileUpload.upload.single('file'))
// .put(updateProfile)

// PUT update profile
router.put(`update_profile`, fileUpload.upload.single('file'), function (req, res, next) {

    var file = "http://localhost/uploads/" + req.file.filename;
    var user_id = req.body.user_id;
    let inputdata = {
        "email_id": req.body.email_id,
        "password": req.body.password,
        "username": req.body.username,
        "picture_url": file
    }
    updateProfile(inputdata, user_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json(err);
        })
    // console.log("file name is",file);

});

// PUT game stats
router.put(`/api/v1/game`, function (req, res, next) {

    var user_id = req.body.user_id;
    let inputdata = {
        "game_played": req.body.game_played,
        "game_won": req.body.game_won,
        "game_lost": req.body.game_lost,
    }
    updateGameStats(inputdata, user_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json(err);
        })
    // console.log("file name is",file);

});

module.exports = router;
