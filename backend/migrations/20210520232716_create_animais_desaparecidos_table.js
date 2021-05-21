
exports.up = function(knex) {
    return knex.schema.createTable('animais_desaparecidos', table => {
        table.increments('id').primary()
        table.string('tipo').notNull()
        table.string('nome').notNull()
        table.string('sexo').notNull()
        table.string('porte').notNull()
        table.string('descricao',400)
        table.string('estado').notNull()
        table.string('cidade').notNull()
        table.string('cep').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.string('imagem').notNull()
        table.timestamp('createdAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('animais_desaparecidos')
};