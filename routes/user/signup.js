const express = require('express');

const router = express.Router();

const { registerUser, updateProfile } = require('../../controller/user/signup');
const { addGameStats, updateGameStats } = require('../../controller/game/game');
const { friendRequest, acceptRequest, changeFriendStatus } = require('../../controller/friends/friends');

var fileUpload = require('../../controller/user/file-upload');

// POST sign up
router.route('/api/v1/signup')
    .post(registerUser);

// router.route('/api/v1/update_profile',fileUpload.upload.single('file'))
// .put(updateProfile)


// PUT update profile
router.put(`/api/v1/update_profile`, fileUpload.upload.single('file'), function (req, res, next) {

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

// POST game stats
router.route('/api/v1/game')
    .post(addGameStats);

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

// POST send friend request
router.route('/api/v1/send-request')
    .post(friendRequest);

// POST accept friend request
router.post(`/api/v1/accept-request`, function (req, res, next) {
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
router.post(`/api/v1/friend-status`, function (req, res, next) {
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

module.exports = router;
