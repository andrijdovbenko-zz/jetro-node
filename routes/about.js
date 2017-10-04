let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
  let data = {
    isAdmin: req.session.isAdmin,
    isLogged: req.session.isLogged,
    userName: req.session.userName
  };
  res.render('about', data);
});

module.exports = router;