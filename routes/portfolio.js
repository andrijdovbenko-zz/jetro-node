let express = require('express');
let router = express.Router();
let db = require('../db-connect');
let mongojs = require('mongojs');

router.get('/', function(req, res, next) {
  db.portfolioItems.find((err, portfolioItems) => {
    if (err) {
      res.render('error', err);
    }
    let data = {
      portfolioItems: portfolioItems,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged,
      userName: req.session.userName
    };
    res.render('portfolio', data);
  });
});

router.get('/:id', function(req, res, next) {
  db.portfolioItems.find((err, portfolioItems) => {
    if (err) {
      res.render('error', err);
    }
    let selectedItem;

    for (let item of portfolioItems) {
      if (String(item._id) === req.params.id) {
        selectedItem = item;
      }
    }
    let data = {
      selectedItem: selectedItem,
      portfolioItems: portfolioItems,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged,
      userName: req.session.userName
    };
    res.render('single-portfolio-item', data);
  });
});

module.exports = router;
