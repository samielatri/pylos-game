const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

router.post('/createUser', async function (req, res){
  console.log("user got created :"+req.body.firstName);
  await db.createUser(req.body);
  res.send('success');
});

/// just to get users, but we can remove user and test if it works
async function f(){
//await db.removeUser('id_to_test');
let users = await db.getUsers();
console.log('Users :'+users);
};
// call of f
f();

router.get('/connectUser',async function (req, res, next){
    passport.authenticate('local', function(err, user, info) {
      console.log('user :',user);
      if(err || !user){
        console.log(err);
        res.sendStatus(400);
      }
      req.logIn(user, function(err){
        if(err){
          console.log(err);
          res.sendStatus(400)
        }else{

          res.redirect('/index');
        }
      });
    })(req, res, next);
  });

      router.get('/logout', function(req, res){
          req.logout();
          res.sendStatus(200);
      });
