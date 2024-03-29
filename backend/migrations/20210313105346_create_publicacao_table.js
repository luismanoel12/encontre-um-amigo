
exports.up = function (knex) {
    return knex.schema.createTable('publicacao', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('imageUrl', 1000)
        table.binary('descricao').notNull()
        table.string('userName')
        table.string('chamada', 500)
        table.string('dataPub')
        table.timestamp('createdAt')
        table.integer('userId').references('id')
            .inTable('users').notNull()

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('publicacao')
};
