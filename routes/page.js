const express = require('express');
const router = express.Router();
const {renderProfile, renderJoin, renderMain} = require('../controllers/page');

// 공적으로 사용하는 변수(데이터) 를 넣을 수 있다?
// next() 가 있어야 미들웨어로 이동한다.
router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
});

// router 에 마지막 미들웨어(render.....) 는 따로 부르는 이름이 존재한다. 
// Controller 라고 불린다. controllers/page.js
router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);