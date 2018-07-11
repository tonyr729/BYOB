const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.use(bodyParser.json())

app.get('/api/v1/games', (request, response) => {
  database('games').select()
    .then(games => {
      response.status(200).json(games)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.get('/api/v1/games/:id', (request, response) => {
  const { id } = request.params
  database('games').where('id', id).select()
    .then(game => {
      if(game.length) {
        response.status(200).json(game)
      } else {
        throw Error;
      }
    })
    .catch(error => {
      response.status(500).json({ errorMessage: `Could not find game with id of ${id}`, error })
    })
})

app.get('/api/v1/pictures', (request, response) => {
  database('pictures').select()
    .then(pictures => {
      response.status(200).json(pictures)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});