const dbConnection = require ('../database/db_connection');
const insertNameLocation = 'INSERT INTO places (name, location, review, stars, tag) VALUES ($1, $2, $3, $4, $5)';


const postData = (inputObj, cb) => {
  dbConnection.query (insertNameLocation, [inputObj.name, inputObj.location, inputObj.review, inputObj.stars, inputObj.tag], (err, res) => {
    if (err)
      return cb (err);
    else {
    cb (null, res);
    }
  });

};

module.exports = postData;
