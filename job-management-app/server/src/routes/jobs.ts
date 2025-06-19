import { Router } from 'express';
import { getJobs, getJob, createJob, updateJob } from '../controllers/jobController';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.put('/:id', updateJob);

export default router;