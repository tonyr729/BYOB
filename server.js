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

app.get('/api/v1/pictures/:id', (request, response) => {
  const {id} = request.params
  database('pictures').where('id', id).select()
    .then(picture => {
      if(picture.length) {
        response.status(200).json(picture)
      } else {
        throw Error;
      }
    })
    .catch(error => {
      response.status(500).json({ errorMessage: `Could not find picture with id of ${id}`, error })        
    })
})

app.post('/api/v1/games', (request, response) => {
  const { game } = request.body
  for(let requiredParameter of ['title', 'url', 'genre']) {
    if(!game[requiredParameter]){
      return response
        .status(422)
        .send({ error: `Expected format {title: <String>, url: <String>, genre: <String>}. You're missing a ${requiredParameter} property.`})
    } 
  }
  database('games').insert(game, 'id')
    .then(gameId => {
      response.status(201).json({ id: gameId[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/pictures', (request, response) => {
  const { picture } = request.body;
  for (let requiredParameter of ['url', 'game_id', 'gameName']) {
    if(!picture[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format {url: <String>, game_id: <Integer>, gameName: <String>} You're missing a ${requiredParameter} property.`})
    }
  }
  database('games').where('id', picture.game_id).select()
    .then(game => {
      if(game.length) {
        database('pictures').insert(picture, 'id')
          .then(pictureId => {
            response.status(201).json({ id: pictureId[0] })
          })
          .catch( error => {
            throw Error
          })
      } else {
        response.status(500).json({ error: 'Could not find matching game for picture submitted' })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.patch('/api/v1/games/:id', (request, response) => {
  const { game } = request.body
  const { id } = request.params
  database('games').where('id', id).update(game, 'id')
    .then(gameId => {
      response.status(202).json({ id: gameId[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.patch('/api/v1/pictures/:id', (request, response) => {
  const { picture } = request.body
  const { id } = request.params
  database('pictures').where('id', id).update(picture, 'id')
    .then(pictureId => {
      response.status(202).json({ id: pictureId[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/games')

app.delete('/api/v1/pictures/:id', (request, response) => {
  const { id } = request.params;
  database('pictures').where('id', id).del()
    .then(() => response.sendStatus(204))
    .catch(error => response.status(404).json({ Error: `Cannot find matching id: ${id}`}))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});