// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/byob_test',
    migrations: {
      directory:'./db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};

