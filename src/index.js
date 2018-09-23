
require('dotenv').config()
import app from './config/express';
import { port, env } from './config/vars';

// Launch
app.listen(port, () => console.log(`Listening on port ${port} ${env}`));