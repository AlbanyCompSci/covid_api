import { Router } from 'express';
import { post as postState, get as getState, all as allStates, time as getStateTimeseries } from '../controllers/covid/v2/state';
import { post as postCounty, get as getCounty, all as allCounties, time as getCountyTimeseries } from '../controllers/covid/v2/county';

const router = Router();

// post
router.post('/', postState);
router.post('/get', postCounty);

// states
router.get('/state/', (req, res) => res.redirect('/v2/states'));
router.get('/state/:id', getState);
router.get('/state/:id/:type', getStateTimeseries);
router.get('/states/', allStates);
router.get('/states/:type', allStates);

// counties
router.get('/county/', (req, res) => res.redirect('/v2/counties'));
router.get('/county/:id', getCounty);
router.get('/county/:id/:type', getCountyTimeseries);
router.get('/counties/', allCounties);
router.get('/counties/:type', allCounties);

export default router;
