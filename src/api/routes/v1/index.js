import express from 'express';
import classificationRoutes from './classification.route';

const router = express.Router()

router.get('/status', (req, res) => res.send('OK'));

router.use('/classification', classificationRoutes)

module.exports = router;