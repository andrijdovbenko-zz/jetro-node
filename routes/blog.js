let express = require('express');
let router = express.Router();
let db = require('../db-connect');
let url = require('url');
let mongojs = require('mongojs');

router.get('/', function (req, res, next) {
  db.posts.find((err, posts) => {
    if (err) {
      render('error', err);
    }
    let postsPerPage = 5;
    let start = 0;
    let end = 5;
    let maxPages = Math.ceil(posts.length / postsPerPage);
    let urlParsed = url.parse(req.url, true);
    if (urlParsed.query.page) {
      let page = urlParsed.query.page;
      start = (page - 1) * postsPerPage;
      end = page * postsPerPage;
    }
    let data = {
      posts: posts.slice(start, end),
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged,
      userName: req.session.userName,
      maxPages: maxPages
    };
    res.render('blog', data);
  });
});

router.get('/:id', function (req, res, next) {
  db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, post) => {
    if (err) {
      render('error', err);
    }
    let data = {
      post: post,
      isAdmin: req.session.isAdmin,
      isLogged: req.session.isLogged,
      userName: req.session.userName
    };
    res.render('single-post', data);
  });
});

router.post('/:id', function (req, res, next) {
  let now = new Date();
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let date = now.toLocaleString("en-US", options);

  let data = req.body;
  data.sender = req.session.userName;
  data.date = date;
  db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, post) => {
    if (err) {
      render('error', err);
    }
    let updPost = post;
    updPost.comments.unshift(data);
    db.posts.update({_id: mongojs.ObjectId(req.params.id)}, updPost, {}, function (err, result) {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;