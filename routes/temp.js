app.get('', function (req, res) {
  let data = {
    title: 'Home',
    user:req.user,
  }
  res.render('index.hbs', data);
});

app.get('/confirmedRegistration', function (req, res) {
  let data = {
    title: 'New registration',
    user:req.user,
  }
  res.render('confirmedRegistration.hbs', data);
});

app.get('/index', function (req, res) {
  let data = {
    title: 'Welcome',
    user:req.user,
  }
  res.render('index.hbs', data);
});

app.get('/logIn', function (req, res) {
  let data = {
    title: 'log in',
    user:req.user,
  }
  res.render('logIn.hbs', data);
});

app.get('/signIn', function (req, res) {
  let data = {
    title: 'sign in',
    user:req.user,
  }
  res.render('signIn.hbs', data);
});

app.get('/play', function (req, res) {
  let data = {
    title: 'play',
    user:req.user,
  }
  res.render('play.hbs', data);
});

app.get('/customPart', function (req, res) {
  let data = {
    title: 'Play ?',
    user:req.user,
  }
  res.render('customPart.hbs', data);
});

app.get('/playVsIA', function (req, res) {
  let data = {
    title: 'Pay AI',
    user:req.user,
  }
  res.render('playVsIA.hbs', data);
});

app.get('/confirmedRegistration', function (req, res) {
  let data = {
    title: 'New registration',
    user:req.user,
  }
  res.render('confirmedRegistration.hbs', data);
});

app.get('/save', function (req, res) {
  let data = {
    title: 'Save game',
    user:req.user,
  }
  res.render('save.hbs', data);
});

app.get('/scenario', function (req, res) {
  let data = {
    title: 'Scenario ?',
    user:req.user,
  }
  res.render('scenario.hbs', data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
})
