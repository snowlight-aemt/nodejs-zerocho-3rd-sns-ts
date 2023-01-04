import {Request, Response, NextFunction, RequestHandler} from 'express';

const isLoggedIn: RequestHandler = (req, res, next) => {
    // isAuthenticated: passport 통해서 로그인 했는지 
    if (req.isAuthenticated()) { 
        next();
    } else {
        res.status(403).send('로그인 필요.');
    }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인 상태입니다.');
        res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
    }
};

export { isLoggedIn, isNotLoggedIn };