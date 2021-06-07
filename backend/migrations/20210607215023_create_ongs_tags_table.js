exports.up = function(knex) {
    return knex.schema.createTable('ongs_tags', table => {
        table.increments('id').primary()
        table.string('nome_tag').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs_tags')
};
