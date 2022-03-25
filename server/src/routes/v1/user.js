const express = require('express');
const { getUsers } = require('../../controllers/user');
const { verifyAccessToken } = require('../../middlewares/jwt');

const router = express.Router();

router.route('/').get(verifyAccessToken, getUsers);

module.exports = router;
