
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('doacoes_com_metas').del()
    .then(function () {
      // Inserts seed entries
      return knex('doacoes_com_metas').insert([
        {
          id: 1, titulo: 'Doações 01', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 1000,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 600, userId: 11, createdAt: new Date()
        },
        {
          id: 2, titulo: 'Doações 02', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 2000,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 1500, userId: 12, createdAt: new Date()
        },
        {
          id: 3, titulo: 'Doações 03', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 3000,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 2000, userId: 13, createdAt: new Date()
        },
        {
          id: 4, titulo: 'Doações 04', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 2200,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 1000, userId: 14, createdAt: new Date()
        },
        {
          id: 5, titulo: 'Doações 05', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 6500,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 3500, userId: 15, createdAt: new Date()
        },
        {
          id: 6, titulo: 'Doações 06', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 800,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 50, userId: 16, createdAt: new Date()
        },
        {
          id: 7, titulo: 'Doações 07', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 3600,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 200, userId: 17, createdAt: new Date()
        },
        {
          id: 8, titulo: 'Doações 08', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 150,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 100, userId: 18, createdAt: new Date()
        },
        {
          id: 9, titulo: 'Doações 09', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 200,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 50, userId: 19, createdAt: new Date()
        },
        {
          id: 10, titulo: 'Doações 10', descricao: 'TESTE TESTE TESTE TESTE TESTE', valorEsperado: 350,
          imageUrl: 'https://static.portaldaindustria.com.br/portaldaindustria/noticias/media/imagem_plugin/shutterstock_OmzR7jx.jpg',
          valorAtual: 500, userId: 20, createdAt: new Date()
        },
      ]);
    });
};
