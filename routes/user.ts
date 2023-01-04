import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';
import { follow } from '../controllers/user';

const router = express.Router();

router.post('/:id/follow', isLoggedIn, follow);
router.get('/:id/follow', follow);
// TODO unFollow 작성하기
// TODO Follow 차단

export default router;
