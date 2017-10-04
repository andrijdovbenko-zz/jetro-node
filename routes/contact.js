let express = require('express');
let router = express.Router();
let db = require('../db-connect');

router.get('/', function (req, res, next) {
  let data = {
    isAdmin: req.session.isAdmin,
    isLogged: req.session.isLogged,
    userName: req.session.userName
  };
  res.render('contact', data);
});

router.post('/', function (req, res, next) {
  let data = req.body;
  db.messages.save(data, (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.sendStatus(200);
    }
  })
});

module.exports = router;
