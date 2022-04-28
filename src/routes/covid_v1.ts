import { Router } from 'express';
import { post, get } from '../controllers/covid_v1';

const router = Router();
router.post('/', post);

router.get('/states/:id', get);

export default router;
