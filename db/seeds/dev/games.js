const games = require('../../../games_data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert(games, 'id');
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
