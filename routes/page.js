const express = require('express');
const router = express.Router();


// router 에 마지막 미들웨어(render.....) 는 따로 부르는 이름이 존재한다. Controller
router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);