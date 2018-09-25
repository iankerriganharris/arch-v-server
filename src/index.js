
import app from './config/express';
import { port, env } from './config/vars';

// Launch
if(env === 'development') {
  app.listen(port, () => console.log(`Listening on port ${port} ${env}`));
}


module.exports = app;