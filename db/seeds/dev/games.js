const games = require('../../../games_data');
const pictures = require('../../../pictures_data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert(games, ['id', 'title'])
        .then((data) => {
          const newPictures = pictures.map(picture => {
            const match = data.find(game => game.title === picture.gameName);

            picture.game_id = match.id;
            return picture;
          });
          
          return knex('pictures').insert(newPictures)
        })
        .then(() => console.log('Seeding Complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`));
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
