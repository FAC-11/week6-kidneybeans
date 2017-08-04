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
    },
    {
      name: "Mezze",
      location: "Roman Road"
    }
  ];
  dbConnection.query("SELECT name, location FROM places;", (err, res) => {
    const actual = res.rows;
    t.deepEquals(actual, expected, "db_connection connects to the database");
    t.end();
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
      name: "canal path",
      location: "across the canal"
    }
  ];
  const input = {
    name: "canal path",
    location: "across the canal"
  };
  postData(input, (err, res) => {
    dbConnection.query(
      "SELECT name, location FROM places WHERE name = 'canal path';",
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
  const expected = [
    {
      id: 1,
      name: "Chesterfield",
      location: "Roman Road",
      review: "excellent, nice sofas",
      stars: 6,
      tag: "sofas"
    },
    {
      id: 2,
      name: "Simply Fresh",
      location: "Roman Road",
      review: "lovely, everyday food",
      stars: 6,
      tag: "food"
    },
    {
      id: 3,
      name: "COOP",
      location: "Roman Road",
      review: "they take cards",
      stars: 3,
      tag: "food,cards"
    },
    {
      id: 4,
      name: "Mezze",
      location: "Roman Road",
      review: "lamacun!!! delicious and cheap!",
      stars: 6,
      tag: "meat"
    },
    {
      id: 5,
      name: "canal path",
      location: "across the canal",
      review: null,
      stars: null,
      tag: null
    }
  ];
  getData((err, res) => {
    const actual = res;
    t.deepEquals(actual, expected, "getData should show whole database object");
    t.end();
    process.exit();
  });
});
