import express from 'express';
import controller from '../../controllers/classification.controller';
import multer from 'multer';
import { tmp } from '../../../config/multer';

const upload = multer(tmp)

const router = express.Router()

router
  .route('/')
  .get(controller.hello)
  .post(upload.single('building'), controller.main)

module.exports = router;