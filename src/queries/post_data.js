const dbConnection = require ('../database/db_connection');
const insertNameLocation = 'INSERT INTO places (name, location) VALUES ($1, $2)';

const postData = (inputObj, cb) => {
  dbConnection.query (insertNameLocation, [inputObj.name, inputObj.location], (err, res) => {
    if (err)
      return cb (err);
    else {
    cb (null, res);
    }
  });

};

module.exports = postData;
