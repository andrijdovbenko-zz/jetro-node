let express = require('express');
let router = express.Router();
let db = require('../db-connect');
let mongojs = require('mongojs');

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
    res.render('portfolio', data);
  });
});

router.get('/:id', function (req, res, next) {
  db.portfolio_items.find((err, portfolio_items) => {
    if (err) {
      render('error', err);
    }
    let selectedItem;

    for (let item of portfolio_items) {
      if (String(item._id) === req.params.id) {
        selectedItem = item;
      }
    }
    let data = {
      selectedItem: selectedItem,
      portfolio_items: portfolio_items,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('single-portfolio-item', data);
  });
});

module.exports = router;
