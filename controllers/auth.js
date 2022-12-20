const User = require('../models/user');
const bcrypt = require('bcrypt');
// views/join.html > /auth/join 요청
exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}
// POST /auth/login
// 1. login 이 호출
// 2. 'local' > localStrategy.js 
// 3. 
exports.login = (req, res, next) => {
    // 콜백 함수 localStrategy.js 와 연관.
    password.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError); 
            return next(authError);
        }

        if (!user) { // 로직 실패
            return res.redirect(`/?loginError=${info.message}`);
        }

        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

exports.logout = () => {

}