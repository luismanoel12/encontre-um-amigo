exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id').primary()
        table.string('endereco').notNull()
        table.integer('numero').notNull()
        table.string('complemento')
        table.string('bairro').unique()
        table.string('estado').notNull()
        table.string('cidade').notNull()
        table.string('cep').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
