const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const router = express.Router();

// 로그인 여부에 따라서 접근할 수 있는 라이터가 다르다. 6장
// POST /auth/join
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);
// GET /auth/logout
router.post('/logout', isLoggedIn, logout);

module.exports = router;
