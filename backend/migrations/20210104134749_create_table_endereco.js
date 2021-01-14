exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id').primary()
        table.string('endereco').notNull()
        table.integer('numero').notNull()
        table.string('complemento')
        table.string('bairro').notNull()
        table.string('estado').notNull()
        table.string('cidade').notNull()
        table.string('cep').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
