import * as dotenv from 'dotenv-safe';

dotenv.config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
}