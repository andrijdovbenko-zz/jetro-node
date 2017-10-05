let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
let db = require('../db-connect');

router.get('/', function(req, res, next) {
  if (req.session.isAdmin) {
    db.posts.find(function(err, posts) {
      if (err) {
        res.render('error', err);
      }
      let data = {
        posts: posts,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('admin-blog', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.get('/blog/:id', function(req, res, next) {
  if (req.session.isAdmin) {
    db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, post) => {
      if (err) {
        res.render('error', err);
      }
      let data = {
        post: post,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('single-post', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.get('/portfolio', function(req, res, next) {
  if (req.session.isAdmin) {
    db.portfolioItems.find(function(err, portfolioItems) {
      if (err) {
        res.render('error', err);
      }
      let data = {
        portfolioItems: portfolioItems,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('admin-portfolio', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.get('/messages', function(req, res, next) {
  if (req.session.isAdmin) {
    db.messages.find(function(err, messages) {
      if (err) {
        res.render('error', err);
      }
      let data = {
        messages: messages,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('admin-messages', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.get('/messages/:id', function(req, res, next) {
  if (req.session.isAdmin) {
    db.messages.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, message) => {
      if (err) {
        res.render('error', err);
      }
      let data = {
        message: message,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('single-message', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.get('/users', function(req, res, next) {
  if (req.session.isAdmin) {
    db.users.find(function(err, users) {
      if (err) {
        res.render('error', err);
      }
      let data = {
        users: users,
        isAdmin: req.session.isAdmin,
        isLogged: req.session.isLogged,
        userName: req.session.userName
      };
      res.render('admin-users', data);
    });
  } else {
    let data = {
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged
    };
    res.render('access-denied', data);
  }
});

router.post('/', function(req, res, next) {
  let data = JSON.parse(req.body.data);
  if (data.formId === 'send-post-form') {
    db.posts.save(data, (err, newPost) => {
      if (err) {
        res.send(err);
      }
      if (newPost) {
        res.sendStatus(200);
      }
    });
  } else if (data.formId === 'send-portfolio-item-form') {
    db.portfolioItems.save(data, (err, newPortfolioItems) => {
      if (err) {
        res.send(err);
      }
      if (newPortfolioItems) {
        res.sendStatus(200);
      }
    });
  }
});

router.delete('/', function(req, res, next) {
  console.log(req.body);
  if (req.body.type === 'post') {
    db.posts.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.sendStatus(200);
      }
    });
  } else if (req.body.type === 'portfolioItem') {
    db.portfolioItems.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.sendStatus(200);
      }
    });
  } else if (req.body.type === 'message') {
    db.messages.remove({_id: mongojs.ObjectId(req.body.id)}, (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.sendStatus(200);
      }
    });
  } else if (req.body.type === 'comment') {
    db.posts.findOne({_id: mongojs.ObjectId(req.body.id)}, (err, post) => {
      post.comments.splice(+req.body.commentId, 1);
      db.posts.update({_id: mongojs.ObjectId(req.body.id)}, post, {}, function(err, result) {
        if (err) {
          res.send(err);
        }
        if (result) {
          res.sendStatus(200);
        }
      });
    });
  }
});

module.exports = router;
