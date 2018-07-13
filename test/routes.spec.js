const environment = process.env.NODE_ENV || 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  
  it('should receive a response of a string when we hit the root endpoint', done => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      })
  });
});

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback()
      .then(() => {
        return database.migrate.latest()
      })
      .then(() => {
        return database.seed.run();
      })
      .then(() => {
        done();
      });
  });

  describe('POST /', () => {
    it.skip('should return a response with a token', done => {
      chai.request(server)
        .post('/')
        .send({
          email: 'garbage@trash.com',
          appName: 'garbage-man'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done()
        })
    })

    it('should return response with status of 500 if there are incorrect request body keys', done => {
      chai.request(server)
        .post('/')
        .send({
          garbage: 'sushi'
        })
        .end((error, response) => {
          response.should.have.status(500);
          done();
        })
    })
  })

  describe('GET /api/v1/games', () => {
    it('should return all of the games', done => {
      chai.request(server)
        .get('/api/v1/games')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(30);
          (response.body[0]).should.have.property('title');
          (response.body[0].title).should.equal('Fallout 76');
          (response.body[0]).should.have.property('url');
          (response.body[0].url).should.equal('https://www.pcgamer.com/fallout-76-is-a-multiplayer-softcore-survival-game-about-building-settlements/');
          (response.body[0]).should.have.property('genre');
          (response.body[0].genre).should.equal('RPG');
          done();
        });
    });
  });

  describe('GET /api/v1/games/:id', () => {
    it('should return a single game', done => {
      chai.request(server)
        .get('/api/v1/games/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          (response.body[0]).should.have.property('title');
          (response.body[0].title).should.equal('Fallout 76');
          (response.body[0]).should.have.property('url');
          (response.body[0].url).should.equal('https://www.pcgamer.com/fallout-76-is-a-multiplayer-softcore-survival-game-about-building-settlements/');
          (response.body[0]).should.have.property('genre');
          (response.body[0].genre).should.equal('RPG');
          done();
        });
    });

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/games/10s001')
        .end((error, response) => {
          response.should.have.status(500);
          done();
        })
    })
  });

  describe('GET /api/v1/pictures', () => {
    it('should return all of the pictures', done => {
      chai.request(server)
        .get('/api/v1/pictures')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(60);
          (response.body[0]).should.have.property('url');
          (response.body[0].url).should.equal('https://images.ctfassets.net/rporu91m20dc/1FNG5YWPv6ayEcsocG8Ymi/bfbdd424ea5f3c7bac79874c9a608376/Fallout76_E3_T51b_Desktop.png?w=1480');
          (response.body[0]).should.have.property('gameName');
          (response.body[0].gameName).should.equal('Fallout 76');
          done();
        });
    });
  });

  describe('GET /api/v1/pictures/:id', () => {
    it('should return all of the pictures', done => {
      chai.request(server)
        .get('/api/v1/pictures/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          (response.body[0]).should.have.property('url');
          (response.body[0].url).should.equal('https://images.ctfassets.net/rporu91m20dc/1FNG5YWPv6ayEcsocG8Ymi/bfbdd424ea5f3c7bac79874c9a608376/Fallout76_E3_T51b_Desktop.png?w=1480');
          (response.body[0]).should.have.property('gameName');
          (response.body[0].gameName).should.equal('Fallout 76');
          done();
        });
    });

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/pictures/10s001')
        .end((error, response) => {
          response.should.have.status(500);
          done();
        })
    })
  });

  describe('POST /api/v1/games', () => {
    it('should create a new game', done => {
      chai.request(server)
        .post('/api/v1/games')
        .send({
          game: {
            title: 'This is the game',
            url: 'thisistheurl.com',
            genre: 'thisisthegenre'
          }
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          (response.body).should.have.property('id');
          response.body.id.should.equal(31);
          done()
        })
    })

    it('should return a response with status 422 if there is a missing parameter', done => {
      chai.request(server)
        .post('/api/v1/games')
        .send({
          game: {
            title: 'so tired of this project'
          }
        })
        .end((error, response) => {
          response.should.have.status(422);
          done();
        })
    })
  })

  describe('POST /api/v1/pictures', () => {
    it('should create a new picture', done => {
      chai.request(server)
        .post('/api/v1/pictures')
        .send({
          picture: {
            url: 'wowow.jpg',
            game_id: 1,
            gameName: 'Fallout 76'
          }
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');        
          (response.body).should.have.property('id');
          response.body.id.should.equal(61);
          done()
        })
    })

    it('should return a response with status 422 if there is a missing parameter', done => {
      chai.request(server)
        .post('/api/v1/pictures')
        .send({
          picture: {
            url: 'sotiredofthisproject.jpg'
          }
        })
        .end((error, response) => {
          response.should.have.status(422);
          done();
        })
    })

    it('should return a response with status 500 if there was no game match', done => {
      chai.request(server)
        .post('/api/v1/pictures')
        .send({
          picture: {
            url: 'partybus.jpg',
            game_id: 20000,
            gameName: 'Party Bus 2: The Revenge of Tony'
          }
        })
        .end((error, response) => {
          response.should.have.status(500);
          done();
        })
    })
  })

  describe('PATCH /api/v1/games/:id', () => {
    it('should update the contents of a specific game', done => {
      chai.request(server)
        .get('/api/v1/games')
        .end((error, response) => {
          chai.request(server)
            .patch('/api/v1/games/' + response.body[0].id)
            .send({
              game: {
                title: 'Tony'
              }
            })
            .end((error, response) => {
              response.should.have.status(202);
              response.should.be.json;
              response.body.should.be.a('object');
              response.body.should.have.property('id');
              response.body.id.should.equal(1);
              done();
            })
        })
    })

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/games')
        .end((error, response) => {
          chai.request(server)
            .patch('/api/v1/games/34fsfd')
            .send({
              game: {
                title: 'Tony'
              }
            })
            .end((error, response) => {
              response.should.have.status(500);
              done();
            })
        })
    })
  })

  describe('PATCH /api/v1/pictures/:id', () => {
    it('should update a the contents of a specific picture', done => {
      chai.request(server)
        .get('/api/v1/pictures')
        .end((error, response) => {
          chai.request(server)
            .patch('/api/v1/pictures/' + response.body[0].id)
            .send({
              picture: {
                url: 'blah.blah.jpg'
              }
            })
            .end((error, response) => {
              response.should.have.status(202);
              response.should.be.json;
              response.body.should.have.property('id');
              response.body.id.should.equal(1)
              done();
            })
        })
    })

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/pictures')
        .end((error, response) => {
          chai.request(server)
            .patch('/api/v1/pictures/34fsfd')
            .send({
              picture: {
                url: 'boopbap.png'
              }
            })
            .end((error, response) => {
              response.should.have.status(500);
              done();
            })
        })
    })
  })

  describe('DELETE, api/v1/pictures/:id', () => {
    it('should delete a specific pictures based on parameters', done => {
      chai.request(server)
        .get('/api/v1/pictures')
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v1/pictures/' + response.body[0].id)
            .end((error, response) => {
              response.should.have.status(204);
              done();
            })
        })
    })

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/pictures')
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v1/pictures/34fsfd')
            .end((error, response) => {
              response.should.have.status(404);
              done();
            })
        })
    })
  })

  describe('DELETE, api/v1/games/:id', () => {
    

    it('should return a response with a status of 500 if incorrect id is provided', done => {
      chai.request(server)
        .get('/api/v1/games')
        .end((error, response) => {
          chai.request(server)
            .delete('/api/v1/games/34fsfd')
            .end((error, response) => {
              response.should.have.status(500);
              done();
            })
        })
    })
  })

  it('should delete a specific game based on parameters', done => {
    chai.request(server)
      .get('/api/v1/games')
      .end((error, response) => {
        chai.request(server)
          .delete('/api/v1/games/' + response.body[0].id)
          .end((error, response) => {
            response.should.have.status(204);
            done();
          })
      })
  })

});