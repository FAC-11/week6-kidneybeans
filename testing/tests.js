const tape = require("tape");
const buildDatabase = require("../src/database/db_build.js");
const dbConnection = require("../src/database/db_connection.js");
const getData = require("../src/queries/get_data.js");
const postData = require("../src/queries/post_data.js");
// testing database actually works
tape("Select all from tablePlaces", t => {
  buildDatabase();
  const expected = [
    {
      name: "Chesterfield",
      location: "Roman Road"
    },
    {
      name: "Simply Fresh",
      location: "Roman Road"
    },
    {
      name: "COOP",
      location: "Roman Road"
    }
  ];
  dbConnection.query("SELECT name, location FROM places;", (err, res) => {
    const actual = res.rows;
    t.deepEquals(actual, expected, "db_connection connects to the database");
    t.end();
    // process.exit();
  });
});
// testing building of new inputs
tape("Insert name and location into table places", t => {
  buildDatabase();
  const insertNameLocation =
    "INSERT INTO places (name, location) VALUES ($1, $2)";
  const expected = [
    {
      name: "park",
      location: "down the street"
    }
  ];
  dbConnection.query(
    insertNameLocation,
    [expected[0].name, expected[0].location],
    (err, res) => {
      dbConnection.query(
        "SELECT name, location FROM places WHERE name = 'park';",
        (err, res) => {
          const actual = res.rows;
          t.deepEquals(
            actual,
            expected,
            "the database should contain the new input"
          );
          t.end();
        }
      );
    }
  );
});

// testing functions work
//testing post database
tape("testing postData", t => {
  buildDatabase();
  const expected = [
    {
      name: "park",
      location: "down the street"
    }
  ];
  const input = {
    name: "park",
    location: "down the street"
  };
  postData(input, (err, res) => {
    dbConnection.query(
      "SELECT name, location FROM places WHERE name = 'park';",
      (err, res) => {
        const actual = res.rows;
        t.deepEquals(
          actual,
          expected,
          "the database should contain the new input"
        );
        t.end();
      }
    );
  });
});
//testing get data
tape("testing getData", t => {
  buildDatabase();
  const expected = [
    {
      id: 1,
      name: "Chesterfield",
      location: "Roman Road"
    },
    {
      id: 2,
      name: "Simply Fresh",
      location: "Roman Road"
    },
    {
      id: 3,
      name: "COOP",
      location: "Roman Road"
    }
  ];
  getData((err, res) => {
    const actual = res;
    t.deepEquals(actual, expected, "getData should show whole database object");
    t.end();
    process.exit();
  });
});
