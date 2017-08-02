const dbConnection = require ('../database/db_connection');
const temporaryConst = 'SELECT * FROM places;';

const getData = (cb) => {
  dbConnection.query (temporaryConst, (err, res) => {
    if (err)
      return cb (err);
    console.log ('res.rows: ', res.rows);
    cb (null, res.rows);
  });

};

module.exports = getData;
