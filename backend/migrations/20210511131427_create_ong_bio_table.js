exports.up = function(knex) {
    return knex.schema.createTable('ong_bio', table => {
        table.increments('id').primary()
        table.binary('descricao').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ong_bio')
};
