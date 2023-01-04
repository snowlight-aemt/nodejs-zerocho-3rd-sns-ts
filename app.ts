import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path =  require('path');
import session from 'express-session';
import nunjucks from 'nunjucks';
import passport from 'passport';
import dotenv from 'dotenv';
import { sequelize } from './models';

dotenv.config(); // 여기부터 사용할 수 있다. => (process.env.COOKIE_SECRET)
import pageRouter from './routes/page';
import authRouter from './routes/auth';
import postRouter from './routes/post';
import userRouter from './routes/user';
import passportConfig from './passport';

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

// 데이터베이스 생성 명령 : npx sequelize db:create
sequelize.sync({ force:true }) // 테이블 삭제 후 다시 생성
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
// 6장 참고 미들웨어
app.use(morgan('dev')); // combined
app.use(express.static(path.join(__dirname, 'public'))); // static resource location
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // static resource location
app.use(express.json());                            // json 요청 (req.body 를 ajax json 요청으로 부터)
app.use(express.urlencoded({ extended: false}));    // form 요청 (req.body 폼으로 부터)
app.use(cookieParser(process.env.COOKIE_SECRET));   // 쿠키 전송 처리 { connect.sid=1234592034923840 } 
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
// passport 는 session 미들웨어 밑에서 생성해야만 한다. !!
app.use(passport.initialize()); // req.user, req.login, req.isAuth.., req.logout
// router/page.js ==> login, isAuto..., user,...
// 위에 initialize 에서 login 를 체크가 완료되면
// passport.session 로 세션에 저장한다.
app.use(passport.session()); // connect.sid 라는 이름으로 세션 쿠키가 브라우저로 전송.
// 브라우저 connect.sid=1234592034923840

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// 미들웨어는 next(error) 를 해야지만 다음 미들웨어로 이동한다.
// 404 NOT FOUND
app.use((req, res, next) => { 
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    // 배포 모드 err 를 숨김.
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러 로그를 서비스한테 넘겨.
    res.status(err.status || 500);
    res.render('error');
    // views/error.html 위치를 찾기 위한 설정. res.render(.....);)
        // app.set('view engine', 'html');
        // nunjucks.configure('views', {
            // express: app,
            // watch: true,
        // });    
});

export default app;

// TODO
// * 팔로잉 끊기 (시퀀라이즈의 destroy 메소드와 라우터 활용)
// * 프로필 정보 변경하기 (시퀀라이즈의 update 메서드와 라우터 활용)
// * 게시글 좋아요 누르기 및 좋아요 취소하기 (사용자 - 게시글 모델 간 N:M 관계 정립후 라우터 활용)
// * 게시글 삭제하기 (등록자와 현재 로그인한 사용자가 같을 때, 시퀄라이즈의 destroy 메서드와 라우터 활용)
// * 사용자 이름을 누르면 그 사용자의 게시글만 보여주기
// * 매번 데이터베이스를 조회하지 않도록 deserializeUser 캐싱하기 (객체 선언 후 객체에 사용
//      자 정보 저장, 객체 안에 캐싱된 값이 있으면 조회)