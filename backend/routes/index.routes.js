import { Router } from 'express'
const router = Router();

router.get('/', (req, res) => {
    res.send('Route')
});
export default router;