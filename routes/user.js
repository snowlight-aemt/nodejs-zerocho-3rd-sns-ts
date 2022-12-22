const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user')

router.post('/:id/follow', isLoggedIn, follow);
router.get('/:id/follow', follow);
// TODO unFollow 작성하기
// TODO Follow 차단

module.exports = router;
