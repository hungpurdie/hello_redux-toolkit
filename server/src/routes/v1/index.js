const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'Success',
    message: 'The API Server is running!.',
  });
});

/** Auth APIs */
router.use('/auth', require('./auth'));

/** User APIs */
router.use('/users', require('./user'));

module.exports = router;
