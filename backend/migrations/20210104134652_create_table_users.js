
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('telefone')
        table.string('cpf').unique()
        table.string('cnpj').unique()
        table.string('password').notNull()
        table.boolean('ong')
        table.boolean('admin').notNull().defaultTo(false)
        table.timestamp('createdAt')
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
