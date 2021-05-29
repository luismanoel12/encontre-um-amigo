const bcrypt = require('bcrypt-nodejs')

exports.seed = function (knex) {
  const ecryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, name: 'Luis Manoel', email: 'luismanoeldasilva@hotmail.com', telefone: '(99) 99999-9999', cpf: '48785178080',
          cnpj: '44744429000169', password: ecryptPassword('123456'), ong: false, admin: true, createdAt: new Date()
        },
        {
          id: 2, name: 'Hugo Joaquim Jesus', email: 'usuario01@hotmail.com', telefone: '(99) 99999-9999', cpf: '97550274088',
          cnpj: '48583297000191', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 3, name: 'Anthony Sérgio Enrico da Rosa', email: 'usuario02@hotmail.com', telefone: '(99) 99999-9999', cpf: '76928028076',
          cnpj: '80899043000190', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 4, name: 'Bento Rodrigo Campos', email: 'usuario03@hotmail.com', telefone: '(99) 99999-9999', cpf: '50162469047',
          cnpj: '91316407000188', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 5, name: 'Ruan Elias Thomas Peixoto', email: 'usuario04@hotmail.com', telefone: '(99) 99999-9999', cpf: '05056645001',
          cnpj: '50191070000142', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 6, name: 'Ana Cristiane Daniela dos Santos', email: 'usuario05@hotmail.com', telefone: '(99) 99999-9999', cpf: '59996259048',
          cnpj: '72533344000177', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 7, name: 'Simone Sara da Luz', email: 'usuario06@hotmail.com', telefone: '(99) 99999-9999', cpf: '39955741066',
          cnpj: '88204273000107', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 8, name: 'Daniel Matheus da Cunha', email: 'usuario07@hotmail.com', telefone: '(99) 99999-9999', cpf: '20908105053',
          cnpj: '33999506000105', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 9, name: 'Jorge Bruno Martins', email: 'usuario08@hotmail.com', telefone: '(99) 99999-9999', cpf: '35060563014',
          cnpj: '15105262000198', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 10, name: 'João Bento Anderson Almada', email: 'usuario09@hotmail.com', telefone: '(99) 99999-9999', cpf: '26908049051',
          cnpj: '44963664000121', password: ecryptPassword('123456'), ong: false, admin: false, createdAt: new Date()
        },
        {
          id: 11, name: 'Mariana Analu Pereira', email: 'ong01@hotmail.com', telefone: '(99) 99999-9999', cpf: '47080060044',
          cnpj: '68233785000186', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 12, name: 'Cláudia Jaqueline Sabrina da Rocha', email: 'ong02@hotmail.com', telefone: '(99) 99999-9999', cpf: '07050532029',
          cnpj: '88344104000164', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 13, name: 'Joana Helena Antonella Duarte', email: 'ong03@hotmail.com', telefone: '(99) 99999-9999', cpf: '67670821043',
          cnpj: '74372983000123', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 14, name: 'Jéssica Clara Bernardes', email: 'ong04@hotmail.com', telefone: '(99) 99999-9999', cpf: '81964579015',
          cnpj: '87591155000128', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 15, name: 'Calebe José da Luz', email: 'ong05@hotmail.com', telefone: '(99) 99999-9999', cpf: '52202715045',
          cnpj: '77297765000160', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 16, name: 'Laís Carla das Neves', email: 'ong06@hotmail.com', telefone: '(99) 99999-9999', cpf: '08972127035',
          cnpj: '59308844000147', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 17, name: 'Manoel Lorenzo Costa', email: 'ong07@hotmail.com', telefone: '(99) 99999-9999', cpf: '73808384077',
          cnpj: '81409862000174', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 18, name: 'Daniel Marcos Melo', email: 'ong08@hotmail.com', telefone: '(99) 99999-9999', cpf: '93739823038',
          cnpj: '58463078000122', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 19, name: 'Sueli Liz Moreira', email: 'ong09@hotmail.com', telefone: '(99) 99999-9999', cpf: '55335955031',
          cnpj: '84735027000112', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },
        {
          id: 20, name: 'Gabriela Camila Corte Real', email: 'ong10@hotmail.com', telefone: '(99) 99999-9999', cpf: '95381198000',
          cnpj: '34630360000199', password: ecryptPassword('123456'), ong: true, admin: false, createdAt: new Date()
        },


      ]);
    });
};
