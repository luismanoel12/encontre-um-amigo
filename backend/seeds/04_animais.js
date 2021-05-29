
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('animais').del()
    .then(function () {
      // Inserts seed entries
      return knex('animais').insert([
        {
          id: 1, tipo: 'Cachorro', nome: 'Cachorro 01', sexo: 'Macho', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 11,
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 2, tipo: 'Cachorro', nome: 'Cachorro 02', sexo: 'Fêmea', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 12, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 3, tipo: 'Cachorro', nome: 'Cachorro 03', sexo: 'Macho', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 13, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 4, tipo: 'Cachorro', nome: 'Cachorro 04', sexo: 'Fêmea', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 14, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 5, tipo: 'Cachorro', nome: 'Cachorro 05', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 15, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 6, tipo: 'Cachorro', nome: 'Cachorro 06', sexo: 'Fêmea', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 16, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 7, tipo: 'Cachorro', nome: 'Cachorro 07', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 17, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 8, tipo: 'Cachorro', nome: 'Cachorro 08', sexo: 'Fêmea', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 18, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 9, tipo: 'Cachorro', nome: 'Cachorro 09', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 19, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 10, tipo: 'Cachorro', nome: 'Cachorro 10', sexo: 'Fêmea', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 20, 
          imagem: 'https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2018/08/DjubZ3nXgAAw4e--550x330.jpg',
          createdAt: new Date()
        },
        {
          id: 11, tipo: 'Gato', nome: 'Gato 01', sexo: 'Fêmea', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 11, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 12, tipo: 'Gato', nome: 'Gato 02', sexo: 'Macho', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 12, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 13, tipo: 'Gato', nome: 'Gato 03', sexo: 'Fêmea', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 13, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 14, tipo: 'Gato', nome: 'Gato 04', sexo: 'Macho', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 14, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 15, tipo: 'Gato', nome: 'Gato 05', sexo: 'Fêmea', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 15, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 16, tipo: 'Gato', nome: 'Gato 06', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 16, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 17, tipo: 'Gato', nome: 'Gato 07', sexo: 'Fêmea', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 17, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 18, tipo: 'Gato', nome: 'Gato 08', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 18, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 19, tipo: 'Gato', nome: 'Gato 09', sexo: 'Fêmea', porte: 'Pequeno', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 19, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },
        {
          id: 20, tipo: 'Gato', nome: 'Gato 10', sexo: 'Macho', porte: 'Médio', vermifugado: true, vacinado: true,
          castrado: true, descricao: 'Amigável mas pode te matar', estado: 'PE', cidade: 'Caruaru', cep: '555670-000', userId: 20, 
          imagem: 'http://4.bp.blogspot.com/_f-D2P3jeAzE/TKxp_CyFDZI/AAAAAAAAB04/SvafZMsWtfo/s1600/Gato+rosa.jpg',
          createdAt: new Date()
        },


      ]);
    });
};
