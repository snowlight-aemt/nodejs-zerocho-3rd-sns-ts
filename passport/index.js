const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

// 모듈을 만들어서 app.js 에서 붙치는 작업을 진행하고 있다.
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where: { id }})
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local();
}

// 1. /auth/login 라우터 - 로그인 요청
// 2. passport 