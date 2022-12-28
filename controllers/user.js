const User = require('../models/user');
const { follow } =require('../services/user');

exports.follow = async (req, res, next) => {
    try {
        const message = await follow(req.user.id, req.params.id);
        if (message === 'ok') {
            res.send('success');
        } else if (message === 'no user') {
            res.status(404).send(message);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};