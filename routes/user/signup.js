// TODO : after signup you are signed in

const express = require('express');

const router = express.Router();

const { registerUser, updateProfile } = require('../../controller/user/signup');
const { addGameStats, updateGameStats } = require('../../controller/game/game');
const { friendRequest, acceptRequest, changeFriendStatus } = require('../../controller/friends/friends');

var fileUpload = require('../../controller/user/file-upload');

// get routes

//router.route('/index')
//.get(mainMenu);

/************************ GET routes ************************/

// GET signup
router.get('/signup', function(req,res){
    // console.log("/signup")
    res.render('users/signup', { title: "sign up" });
  });

// GET signup
router.get('/rules', function(req,res){
    // console.log("/signup")
    res.render('infos/rules', { title: "sign up" });
  });


// GET terms
router.get('/signup/terms', function(req,res){
    // console.log("/terms")
    res.render('infos/terms', { title: "terms", page: "signup" });
  });

// GET terms
router.get('/general/terms', function(req,res){
    // console.log("/terms")
    res.render('infos/terms', { title: "terms", page: "genaral" });
  });

// GET about
router.get('/general/about', function(req,res){
    // console.log("/terms")
    res.render('infos/about', { title: "terms", page: "genaral" });
  });

// GET help
router.get('/general/help', function(req,res){
    // console.log("/terms")
    res.render('infos/help', { title: "terms", page: "genaral" });
  });

  // GET contact
router.get('/general/contact', function(req,res){
    // console.log("/terms")
    res.render('infos/contact', { title: "terms", page: "genaral" });
  });


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
router.put(`/game`, function (req, res, next) {

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


// GET

// Get gameMenu
router.get('/game', function(req, res){
    // console.log("/game")
    res.render('game/play', { title: "game" });
  });
  
// POST
router.route('game')
.post(addGameStats);

module.exports = router;
