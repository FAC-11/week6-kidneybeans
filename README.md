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
