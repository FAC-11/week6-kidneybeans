# Kidney beans

_*Find local restaurant and coffee shops close to FAC!*_

## WHAT
With our app you'll be able to:
* Browse recommended restaurants/ coffee shops nearby
* Add a new place
* Add a rating and review of an existing place

## WHY
Coding is hungry work so FACCers love to eat and drink to maintain a healthy level of focus on their code. This can have nasty concequences.

Overheard from Rebeca:
>The Spanish are animals. Without food I'll eat you all.
>
No one wants to be food for Rebeca. 

There's a second problem as well. Every 16 weeks 16 brand new people come to Bethnal Green with little to no knowledge of the area. The results in hundreds of Great British pounds being spent at Simply Fresh. 
The food knowledge of ledacy faccers is hard to come by when the focus needs to be kept on hard core code life. 

This is where __'Beans'__ comes in. 

__Beans__ provides a platform for all FACers to enter their tried and tested locations for food & drinks as well as review other peoples inputs.

We think it's great, but don't just take our word for it:

>The best idea since sliced bread! _*Constantina*_
>
>This will change my life. _*Max*_
>
>All of these places right on our doorstep. Maybe i'll branch out from Meze... _*James*_


## HOW

- [x] Add all empty files and dependencies
- [x] Make a database
- [x] Push to Heroku (we ending up doing this a lot later on)
- [x] Create a server that serves simple files _*(HTML, CSS, etc.)*_
- [x] Connect server to the DB
- [x] Bug fix
- [x] API call
- [x] Testing
- [x] Dom manipulation
- [x] Styling
- [ ] Form validation     


## How do we split the work and pair?

__pairing__
After last week we were very strict on swapping pairs every 1-2 hours, resulting in everyone working on all aspects of the app and working with all members of the team multiple times. 

__workflow__
We started the project with an mvp in mind to keep the requirements and our stress levels to a minimum. This made us way more productive and allowed us a clear point where we had accomplished our goals. 

__git__
Still need to remember to make branches. 



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



