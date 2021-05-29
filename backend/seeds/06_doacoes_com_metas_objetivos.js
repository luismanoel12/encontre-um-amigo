
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('doacoes_com_metas_objetivos').del()
    .then(function () {
      // Inserts seed entries
      return knex('doacoes_com_metas_objetivos').insert([
        { id: 1, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 1, userId: 11 },
        { id: 2, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 1, userId: 11 },
        { id: 3, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 2, userId: 12 },
        { id: 4, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 2, userId: 12 },
        { id: 5, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 3, userId: 13 },
        { id: 6, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 3, userId: 13 },
        { id: 7, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 4, userId: 14 },
        { id: 8, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 4, userId: 14 },
        { id: 9, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 5, userId: 15 },
        { id: 10, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 5, userId: 15 },
        { id: 11, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 6, userId: 16 },
        { id: 12, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 6, userId: 16 },
        { id: 13, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 7, userId: 17 },
        { id: 14, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 7, userId: 17 },
        { id: 15, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 8, userId: 18 },
        { id: 16, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 8, userId: 18 },
        { id: 17, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 9, userId: 19 },
        { id: 18, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 9, userId: 19 },
        { id: 19, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 10, userId: 20 },
        { id: 20, titulo: 'Comprar algo', descricao: 'Vamos comprar algo', valor: 500, metasId: 10, userId: 20 },
      ]);
    });
};
