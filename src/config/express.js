
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from '../api/routes/v1';

// App settings.
const app = express()
  .use(helmet())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/v1', routes)
  .use('/static', express.static('public'))
  
module.exports = app;
