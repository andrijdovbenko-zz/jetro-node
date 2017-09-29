let express = require('express');
let router = express.Router();
let db = require('../db-connect');

router.get('/', function (req, res, next) {
  db.portfolio_items.find((err, portfolio_items) => {
    if (err) {
      render('error', err);
    }
    let data = {
      portfolio_items: portfolio_items,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('home', data);
  });
});

module.exports = router;



