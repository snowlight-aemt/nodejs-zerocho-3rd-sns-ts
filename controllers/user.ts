import User from '../models/user';
import { follow as followService } from '../services/user';
import {RequestHandler} from "express";

const follow: RequestHandler = async (req, res, next) => {
    try {
        const message = await followService(req.user!.id, req.params.id);
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

export { follow };