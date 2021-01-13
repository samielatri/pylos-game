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
router.route('/api/v1/forgot-username')
.get(forGotUsername);

// GET allUsers
router.route('/api/v1/users')
.get(allUsers);

// GET friendList
router.route('/api/v1/user_friend')
.get(getFriendList);


/************************ POST routes ************************/

// POST userLogin
router.route('/api/v1/login')
.post(userLogin);

// POST forGotPossword
router.route('/api/v1/forgot-password')
.post(forGotPassword);

// POST resetPassword
router.route('/api/v1/reset-password')
.post(resetPassword);

module.exports = router;
