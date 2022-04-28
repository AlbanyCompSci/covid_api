import { Router } from 'express';
import { post, get } from '../controllers/home';

const router = Router();

router.post('/', post);
router.get('/', get);

export default router;
