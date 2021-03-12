
exports.up = function(knex) {
    return knex.schema.createTable('doacoes_com_metas_objetivos', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('descricao', 250)
        table.decimal('valor').notNull()
        table.integer('metasId').references('id')
        .inTable('doacoes_com_metas').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doacoes_com_metas_objetivos')
};