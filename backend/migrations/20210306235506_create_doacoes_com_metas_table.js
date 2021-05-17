
exports.up = function(knex) {
    return knex.schema.createTable('doacoes_com_metas', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.binary('descricao')
        table.string('imageUrl', 1000)
        table.integer('valorEsperado').notNull()
        table.integer('valorAtual').notNull()
        table.integer('userId').references('id')
        .inTable('users').notNull()
        table.timestamp('createdAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doacoes_com_metas')
};