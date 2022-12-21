const { hash } = require('bcrypt');
const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
};

exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url
    // content 예: 노드교과서 너무 재미 #노드교솨서 #익스프레스 짱짱 - 태그 추출
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        })
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        console.log(hashtags);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({
                    where: { title: tag.slice(1).toLowerCase() }
                });
            }));
            console.log('result', result);
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        next(error);
    }
};