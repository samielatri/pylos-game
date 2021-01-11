const express= require('express');
const router= express.Router();
const { userLogin, forGotPassword, forGotUsername,resetPassword, allUsers, getFriendList }= require('../../controller/user/login');
/* GET users listing. */
router.get('/login', function(req,res){
    // console.log("logged in")
    res.render('index');
  });

  router.route('/users')
.get(allUsers)

router.route('/api/v1/login')
.post(userLogin);
router.route('/api/v1/forgot-password')
.post(forGotPassword);
router.route('/api/v1/forgot-username')
.get(forGotUsername)
router.route('/api/v1/reset-password')
.post(resetPassword)
router.route('/api/v1/users')
.get(allUsers)

router.route('/api/v1/user_friend')
.get(getFriendList)
module.exports=router;