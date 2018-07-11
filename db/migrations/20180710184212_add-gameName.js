
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pictures', function(table) {
      table.string('gameName');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pictures', function(table) {
      table.dropColumn('gameName');
    })
  ]);
};