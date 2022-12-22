const express = require('express');
const router = express.Router();
const {renderProfile, renderJoin, renderMain} = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares')

// 공적으로 사용하는 변수(데이터) 를 넣을 수 있다?
// next() 가 있어야 미들웨어로 이동한다.
router.use((req, res, next) => {
    //  - req.user 데이터는 어디서 입력했는지 
    //  - router/auth.js ==> login()
    //  - middlewares/index.js ==> isAuthenticated()
    // passport 마지막 프로세스에서 확인할 수 있다??
    // app.js ===> app.use(passport.intialize()) 를 진행가 실행 될 때 위에 필드과 함수가 추가된다. 

    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    // req.session.data = 1234 // 사용자 로그아웃 까지 저장되는 데이터
    next();
});

// router 에 마지막 미들웨어(render.....) 는 따로 부르는 이름이 존재한다. 
// Controller 라고 불린다. controllers/page.js
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;