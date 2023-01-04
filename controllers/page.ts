import Post from '../models/post';
import User from '../models/user';
import Hashtag from '../models/hashtag';
import {RequestHandler} from "express";

const renderProfile: RequestHandler = (req, res, next) => {
    // 서비스를 호출 

    res.render('profile', {title: '내 정보 - NodeBird'});
    // res.render(....);
    // res.locals.... 한 데이터도 프론트로 넘어가지만
    // res.render('views', {두 번째 파라미터}) 도 프론트로 넘어간다.
};
const renderJoin: RequestHandler = (req, res, next) => {
    res.render('join', {title: '회원 가입 - NodeBird'});
};
const renderMain: RequestHandler = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        console.log('posts', posts);
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 라우터 -> 컨트롤러 -> 서비스
// 계층 레이어 (11장에서 설명)

const renderHashtag: RequestHandler = async (req, res, next) => {
    const query = req.query.hashtag;

    if (!query) {
        return res.redirect('/');
    }

    try {
        const hashtag = await Hashtag.findOne({ where: { title: query }});
        let posts: Post[] = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick'] }],
                order: [['createdAt', 'DESC']]
            });
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { renderProfile, renderHashtag, renderJoin, renderMain };