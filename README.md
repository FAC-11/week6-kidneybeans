# Kidney beans

_*Find local restaurant and coffee shops close to FAC!*_

## WHAT
With our app you'll be able to:
* Browse recommended restaurants/ coffee shops nearby
* Add a new place
* Add a rating/review of an existing place

## WHY
__Insert user story__

## HOW

- [x] Add all empty files and dependencies
- [ ] Make a database
- [ ] Push to Heroku
- [ ] Create a server that serves simple files _*(HTML, CSS, etc.)*_
- [ ] Connect server to the DB

__Resulting user journey__

## How do we split the work and pair?

## What did we learn?


### Setup local database
In order to run our tests, you will need to set up a local database as follows.

In terminal type ```psql``` or ```pgcli``` if installed.
Within psql/pcli enter the following commands each followed by an enter. Things in square brackets are for your desired values (without square brackets). Note that password is a string inside '' (NOT double ""):
```sql
CREATE DATABASE [db_name];
CREATE USER [user_name] WITH PASSWORD ['password'];
```

Now you can set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

```postgres://[user_name]:[password]@localhost:5432/[db_name]```

Next run the db_build.js file in terminal:
```node src/database/db_build.js```
This will create the schema and populate it with a small amount of data.

### **SQL Injection**
---------

Kidney-beans runs in postgre SQL and we connect to our localtesting and remote databases through the `pg`, `pg-pool` `node-postgres`, node modules.

The `node-postgres`module handles SQL injection.
From [The documentation](https://github.com/brianc/node-postgres/wiki/FAQ#8-does-node-postgres-handle-sql-injection):
	

    Absolutely! The parameterized query support in node-postgres is first class. All escaping is done by the postgresql server ensuring proper behavior across dialects, encodings, etc... For example, this will not inject sql:
    
    client.query("INSERT INTO user(name) VALUES($1)", ["'; DROP TABLE user;"], function (err, result) {
      // ...
    });`

If we were trying to migrate to another database or another database-client then we may need to use a regex to escape out special characters such as quotes.

