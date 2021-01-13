const express = require('express'); // express

const router = express.Router(); 
const { userLogin, forGotPassword, forGotUsername,resetPassword, allUsers, getFriendList } = require('../../controller/user/login');

/************************ GET routes ************************/

router.get('/', function(req,res){
    // console.log("/")
    res.render('index', { title: "login" });
});

// GET users listing
router.get('/login', function(req,res){
    // console.log("/login")
    res.render('users/signin', { title: "login" });
  });

// GET all users
router.route('/users')
.get(allUsers);

// GET forGotUsername
router.route('/forgot-username')
.get(forGotUsername);

// GET allUsers
router.route('/users')
.get(allUsers);

// GET friendList
router.route('/user_friend')
.get(getFriendList);

// Get gameMenu
router.get('/game-menu', function(req,res){
  // console.log("/")
  res.render('game/game-menu', { title: "game menu" });
});


// Get gameMenu
router.get('/forgot-password', function(req,res){
  // console.log("/")
  res.render('users/forgotpassword', { title: "game menu" });
});

/************************ POST routes ************************/

// POST userLogin
router.route('/login')
.post(userLogin);

// POST forGotPossword
router.route('/forgot-password')
.post(forGotPassword);

// POST resetPassword
router.route('/reset-password')
.post(resetPassword);

module.exports = router;
