exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('genre');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('pictures', function(table) {
      table.increments('id').primary();
      table.string('url');
      table.integer('game_id').unsigned()
      table.foreign('game_id')
        .references('games.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pictures'),
    knex.schema.dropTable('games')
  ]);
};