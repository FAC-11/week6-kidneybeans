const {Pool} = require ('pg');                //cunning syntax ;)
const url = require('url');
require ('env2')('./config.env');             //env2 exports a function

if (!process.env.DATABASE_URL)
  throw new Error ('Env var DB_URL must be set');

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  host : params.hostname,
  port : params.port,
  database : params.pathname.split('/')[1],
  max : process.env.DB_MAX_CONNECTIONS || 2,      //we use >1 in case one gets blocked
                                                  // by hanging or not being closed
  user: username,
  password,       //as is
  ssl : params.hostname !== 'localhost'

};

module.exports = new Pool (options);
