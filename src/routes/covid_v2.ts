import { Router } from 'express';
import { post, getState, allStates, getStateTimeseries } from '../controllers/covid_v2';

const router = Router();

router.post('/', post);
router.get('/state/', (req, res) => res.redirect('/v2/states'));
router.get('/state/:id', getState);
router.get('/state/:id/:type', getStateTimeseries);
router.get('/states/:type', allStates);

export default router;
