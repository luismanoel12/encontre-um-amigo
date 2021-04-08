exports.up = function(knex) {
    return knex.schema.createTable('denucia', table => {
        table.increments('id').primary()
        table.string('tipoDenucia').notNull()
        table.string('status', 100)
        table.binary('descricao').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.timestamp('createdAt')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('denucia')
};
