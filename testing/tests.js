const tape = require('tape');
const dbBuild = require('./database/db_build.js');
const dbConnection = require('./database/db_connection.js');

tape('Select all from tablePlaces', (t) => {
  const expected = [{
      name: 'Chesterfield',
      location: 'Roman Road'
    }, {
      name: 'Simply Fresh',
      location: 'Roman Road'
    },
    {
      name: 'COOP',
      location: 'Roman Road'
    }
  ];
  dbConnection.query('SELECT name, location FROM places;', (err, res) => {
    const actual = res.rows;
    t.deepEquals(actual, expected, 'db_connection connects to the database');
    t.end();
    // process.exit();
  });
});

tape('Insert name and location into table places', (t) => {
  const insertNameLocation = 'INSERT INTO places (name, location) VALUES ($1, $2)';
  const expected = [{
    name: 'park',
    location: 'down the street'
  }];
  dbConnection.query(insertNameLocation, [expected[0].name, expected[0].location], (err, res) => {
    dbConnection.query("SELECT name, location FROM places WHERE name = 'park';", (err, res) => {
      const actual = res.rows;
      t.deepEquals(actual, expected, 'the database should contain the new input');
      t.end();
      process.exit();
    });
  });
});
