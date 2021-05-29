exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('endereco').del()
    .then(function () {
      // Inserts seed entries
      return knex('endereco').insert([
        {
          id: 1, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 1
        },
        {
          id: 2, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 2
        },
        {
          id: 3, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 3
        },
        {
          id: 4, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 4
        },
        {
          id: 5, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 5
        },
        {
          id: 6, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'RS', cidade: 'Caruaru', cep: '55670-000', userId: 6
        },
        {
          id: 7, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 7
        },
        {
          id: 8, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 8
        },
        {
          id: 9, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'MA', cidade: 'Caruaru', cep: '55670-000', userId: 9
        },
        {
          id: 10, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'RJ', cidade: 'Caruaru', cep: '55670-000', userId: 10
        },
        {
          id: 11, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PB', cidade: 'Caruaru', cep: '55670-000', userId: 11
        },
        {
          id: 12, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'SE', cidade: 'Caruaru', cep: '55670-000', userId: 12
        },
        {
          id: 13, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'RS', cidade: 'Caruaru', cep: '55670-000', userId: 13
        },
        {
          id: 14, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'AP', cidade: 'Caruaru', cep: '55670-000', userId: 14
        },
        {
          id: 15, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'AC', cidade: 'Caruaru', cep: '55670-000', userId: 15
        },
        {
          id: 16, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'GO', cidade: 'Caruaru', cep: '55670-000', userId: 16
        },
        {
          id: 17, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'MG', cidade: 'Caruaru', cep: '55670-000', userId: 17
        },
        {
          id: 18, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'MA', cidade: 'Caruaru', cep: '55670-000', userId: 18
        },
        {
          id: 19, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'MA', cidade: 'Caruaru', cep: '55670-000', userId: 19
        },
        {
          id: 20, endereco: 'Avenida Fake', numero: 50, complemento: 'Perto da Escola', bairro: 'Centro',
          estado: 'PE', cidade: 'Caruaru', cep: '55670-000', userId: 20
        },
        
      ]);
    });
};
