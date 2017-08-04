const dbConnection = require ('../database/db_connection');
const validate = require ('./validation.js');
const insertNameLocation = 'INSERT INTO places (name, location, review, stars, tag) VALUES ($1, $2, $3, $4, $5)';
var dontDoIt = false;

const postData = (inputObj, cb) => {
  const queryColumns = {
    query: [inputObj.name, inputObj.location, inputObj.review, inputObj.stars, inputObj.tag],
    validationObjects: [
      { string : true, max : 100},
      { string : true, max : 100},
      { string : true, max : 1000},
      { integer : true, max : 11},
      { string : true, max : 100, prohibited:[' ']}
    ]
  };
  try {
    console.log ('VALIDATE THIS: ', queryColumns.query.length, queryColumns.query, queryColumns.validationObjects)
    let i = queryColumns.query.length;
    while (i--)
      validate (queryColumns.query[i],queryColumns.validationObjects[i]);
  }
  catch (error){
    dontDoIt = true;
    console.log (error);
  };

  if (!dontDoIt)
    dbConnection.query (insertNameLocation, queryColumns.query, (err, res) => {
      if (err)
        return cb (err);
      else {
      cb (null, res);
      }
    });

};

module.exports = postData;
