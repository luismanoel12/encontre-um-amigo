// Update with your config settings.

module.exports = {

  client: 'postgresql',
  connection: {
    database: 'encontre_um_amigo',
    host : '127.0.0.1',
    port:   5433,
    user:     'postgres',
    password: '123456'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
