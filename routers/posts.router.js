import express from 'express';
import {
    index,
    show,
    store,
    update,
    modify,
    destroy
} from '../controllers/posts.controllers.js';
import validatePost from '../middlewares/validatePostData.js';

const router = express.Router();

router.get('/', index);

router.get('/:id', show);

router.post('/', validatePost, store);

router.put('/:id', validatePost, update);

router.patch('/:id', modify);

router.delete('/:id', destroy);

export default router;