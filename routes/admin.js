let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
let db = require('../db-connect');

router.get('/', function (req, res, next) {
  if (req.session.isAdmin) {
    db.posts.find(function (err, posts) {
      if (err) {
        render('error', err);
      }
      let data = {
        posts: posts,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged
      };
      res.render('admin-blog', data);
    });
  } else {
    res.render('access-denied', {isAdmin: req.session.isAdmin, isLogged: req.session.isLogged});
  }
});

router.get('/portfolio', function (req, res, next) {
  if (req.session.isAdmin) {
    db.portfolio_items.find(function (err, portfolio_items) {
      if (err) {
        render('error', err);
      }
      let data = {
        portfolioItems: portfolio_items,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged
      };
      res.render('admin-portfolio', data);
    });
  } else {
    res.render('access-denied', {isAdmin: req.session.isAdmin, isLogged: req.session.isLogged});
  }
});

router.get('/messages', function (req, res, next) {
  if (req.session.isAdmin) {
    db.messages.find(function (err, messages) {
      if (err) {
        render('error', err);
      }
      let data = {
        messages: messages,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged
      };
      res.render('admin-messages', data);
    });
  } else {
    res.render('access-denied', {isAdmin: req.session.isAdmin, isLogged: req.session.isLogged});
  }
});

router.get('/messages/:id', function (req, res, next) {
  if (req.session.isAdmin) {
    db.messages.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, message) => {
      if (err) {
        render('error', err);
      }
      let data = {
        message: message,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged
      };
      res.render('single-message', data);
    });
  } else {
    res.render('access-denied', {isAdmin: req.session.isAdmin, isLogged: req.session.isLogged});
  }
});

router.get('/users', function (req, res, next) {
  if (req.session.isAdmin) {
    db.users.find(function (err, users) {
      if (err) {
        render('error', err);
      }
      let data = {
        users: users,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged
      };
      res.render('admin-users', data);
    });
  } else {
    res.render('access-denied', {isAdmin: req.session.isAdmin, isLogged: req.session.isLogged});
  }
});

router.post('/', function (req, res, next) {
  let data = JSON.parse(req.body.data);
  if (data.form_id === 'send_post_form') {
    db.posts.save(data, (err, newPost) => {
      if (err) {
        res.send(err);
      }
      if (newPost) {
        res.sendStatus(200);
      }
    })
  } else if (data.form_id === 'send_portfolio_item_form') {
    db.portfolio_items.save(data, (err, newPortfolioItems) => {
      if (err) {
        res.send(err);
      }
      if (newPortfolioItems) {
        res.sendStatus(200);
      }
    })
  }
});

router.delete('/', function (req, res, next) {
  console.log(req.body);
  if (req.body.type === 'post') {
    db.posts.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(result);
      if (result) {
        res.sendStatus(200);
      }
    })
  } else if (req.body.type === 'portfolioItem') {
    db.portfolio_items.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(result);
      if (result) {
        res.sendStatus(200);
      }
    })
  } else if (req.body.type === 'message') {
    db.messages.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(result);
      if (result) {
        res.sendStatus(200);
      }
    })
  }
});

module.exports = router;
