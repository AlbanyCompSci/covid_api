import { Router } from 'express';
import { post, get, getFips } from '../controllers/fips';

const router = Router();

router.post('/', post);
router.get('/', get);
router.get('/:type', getFips);
router.get('/:type/:id', getFips);

export default router;
