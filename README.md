[![Build Status](https://travis-ci.org/tonyr729/BYOB.svg?branch=master)](https://travis-ci.org/tonyr729/BYOB)

#BYOB

## Synopsis

BYOB (Build Your Own Backend) is an application serving up endpoints for unreleased games for 2018.  Users must provide an email address and application name to receive token access.  This token allows them to access the database.

### Endpoints

* ```POST - /```
* ```GET - /api/v1/games```
* ```GET - /api/v1/pictures```
* ```GET - /api/v1/games/:id```
* ```GET - /api/v1/pictures/:id```
* ```POST - /api/v1/games/:id```
* ```POST - /api/v1/pictures/:id```
* ```PATCH - /api/v1/games/:id```
* ```PATCH - /api/v1/pictures/:id```
* ```DELETE - /api/v1/games/:id```
* ```DELETE = /api/v1/pictures/:id```

### Tools/Technologies

* Express
* Knex
* PostgreSQL
* JSON Web Token
* Chai
* Mocha
* Game data scraped using Nightmare from [PC Gamer](https://www.pcgamer.com/new-games-2018/1/)

### *Example* 

Deployed Application : https://byob-2018-games.herokuapp.com/

![Home Page](https://i.imgur.com/SaC3WBM.png)

---

## Contributors

* [Tony Roberston](https://github.com/tonyr729)
* [Seamus Quinn](https://github.com/seamus-quinn)

_(**Turing School of Software & Design Front-end Engineering project - Mod 3:** [BYOB Project Spec](http://frontend.turing.io/projects/build-your-own-backend.html))_ 
