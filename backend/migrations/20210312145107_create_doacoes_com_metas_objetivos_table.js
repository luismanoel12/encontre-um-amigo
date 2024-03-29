
exports.up = function(knex) {
    return knex.schema.createTable('doacoes_com_metas_objetivos', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('descricao', 250)
        table.integer('valor').notNull()
        table.integer('metasId').references('id')
        .inTable('doacoes_com_metas').notNull()
        table.integer('userId').references('id')
        .inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doacoes_com_metas_objetivos')
};