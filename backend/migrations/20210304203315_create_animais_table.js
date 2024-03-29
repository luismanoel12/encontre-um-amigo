
exports.up = function(knex) {
    return knex.schema.createTable('animais', table => {
        table.increments('id').primary()
        table.string('tipo').notNull()
        table.string('nome').notNull()
        table.string('sexo').notNull()
        table.string('porte').notNull()
        table.boolean('deficiente')
        table.boolean('vermifugado')
        table.boolean('vacinado')
        table.boolean('castrado')
        table.string('descricao',400)
        table.string('estado').notNull()
        table.string('cidade').notNull()
        table.string('cep').notNull()
        table.string('status').notNull()
        table.boolean('desaparecido')
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.string('imagem').notNull()
        table.timestamp('createdAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('animais')
};