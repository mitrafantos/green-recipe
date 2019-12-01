const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/recipes');
  // res.send('success');
});

module.exports = router;
