exports.up = function(knex) {
    return knex.schema.createTable('denuncia', table => {
        table.increments('id').primary()
        table.string('tipoDenuncia').notNull()
        table.string('status', 100)
        table.string('descricao').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.timestamp('createdAt')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('denuncia')
};
