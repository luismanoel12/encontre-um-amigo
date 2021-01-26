
exports.up = function(knex) {
    return knex.schema.createTable('carousel', table => {
        table.increments('id').primary()
        table.string('author').notNull()
        table.string('link').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('carousel')
};
