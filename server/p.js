const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;


router.post('/createP', async function (req, res){
  console.log("P created"+req.body.cols);
  await db.createP(req.body);
  res.send('success');
});

router.post('/findP', async function (req, res){
  var nickname = req.body;
  const result = await db.P.findOne(nickname);
  console.log('result :',result);
  console.log('board :',result.board);
  res.send(result);
});
