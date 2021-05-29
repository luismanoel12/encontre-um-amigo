exports.up = function(knex) {
    return knex.schema.createTable('doacoes', table => {
        table.increments('id').primary()
        table.string('meio_pagamento').notNull()
        table.string('descricao').notNull()
        table.string('link')
        table.integer('userId').references('id')
            .inTable('users').notNull()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doacoes')
};
