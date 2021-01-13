// TODO : call it
const express= require('express');
const router= express.Router();
const { addGameStats }= require('../../controller/game/game');

// GET

// Get gameMenu
router.get('/game', function(req, res){
    // console.log("/game")
    res.render('user/login', { title: "game" });
  });
  
// POST
router.route('game')
.post(addGameStats);

module.exports = router;
