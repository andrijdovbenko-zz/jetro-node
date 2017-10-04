let express = require('express');
let router = express.Router();
let db = require('../db-connect');

router.get('/', function (req, res, next) {
  db.portfolioItems.find((err, portfolioItems) => {
    if (err) {
      render('error', err);
    }
    let data = {
      portfolioItems: portfolioItems,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged,
      userName: req.session.userName
    };
    res.render('home', data);
  });
});

module.exports = router;
