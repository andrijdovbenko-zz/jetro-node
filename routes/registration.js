let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let keys = require('../keys.json');
let db = require('../db-connect');

router.get('/', function (req, res, next) {
  let data = {
    isAdmin: req.session.isAdmin,
    isLogged: req.session.isLogged,
    userName: req.session.userName
  };
  res.render('registration', data);
});

router.post('/', function (req, res, next) {
  let newUser = req.body;
  if (newUser.password !== newUser.duplicatedPassword) {
    res.statusCode = 400;
    res.json({"field": "duplicated-password", "text": "Passwords should be the same"})
  } else {
    newUser.password = crypto.createCipher('aes-256-ctr', keys.cryptoKey).update(newUser.password, 'utf-8', 'hex');
    newUser.isAdmin = false;
    delete newUser.duplicatedPassword;
    db.users.findOne({login: newUser.login}, (err, user) => {
      if (err) {
        render('error', err);
      }
      if (user === null) {
        db.users.save(newUser, (err, newUser) => {
          if (err) {
            res.send(err);
          }
          if (newUser) {
            res.sendStatus(200);
          }
        });
      } else {
        res.statusCode = 409;
        res.json({"field": "login", "text": " User with such login already exists"})
      }
    });
  }
});

module.exports = router;
