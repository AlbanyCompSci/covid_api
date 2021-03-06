import { Router } from 'express';
import CovidV1Router from './covid_v1';
import CovidV2Router from './covid_v2';
import HomeRouter from './home';
import FIPsRouter from './fips';

const router = Router();
router.use('/', HomeRouter);
router.use('/fips', FIPsRouter);
router.use('/v1', CovidV1Router);
router.use('/v2', CovidV2Router);

export default router;
