const express = require('express'); // express

const router = express.Router(); 
const { userLogin, forGotPassword, forGotUsername,resetPassword, allUsers, getFriendList }= require('../../controller/user/login');

// GET users listing
router.get('/login', function(req,res){
    // console.log("logged in")
    res.render('index');
  });

// GET all users
router.route('/users')
.get(allUsers);

// POST userLogin
router.route('/api/v1/login')
.post(userLogin);

// POST forGotPossword
router.route('/api/v1/forgot-password')
.post(forGotPassword);

// GET forGotUsername
router.route('/api/v1/forgot-username')
.get(forGotUsername);

// POST resetPassword
router.route('/api/v1/reset-password')
.post(resetPassword);

// GET allUsers
router.route('/api/v1/users')
.get(allUsers);

// GET friendList
router.route('/api/v1/user_friend')
.get(getFriendList);

module.exports = router;