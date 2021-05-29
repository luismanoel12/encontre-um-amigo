
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('carousel').del()
    .then(function () {
      // Inserts seed entries
      return knex('carousel').insert([
        { id: 1, author: 'Admin', link: 'https://i.imgur.com/7RBuckJ.png' },
        { id: 2, author: 'Admin', link: 'https://i.imgur.com/rH96uKS.png' },
        { id: 3, author: 'Admin', link: 'https://i.picsum.photos/id/237/1440/500.jpg?hmac=2eXrOJz6HvJ_Rq-HZEZtMTOOCBM6vAYgv2pOMylGgqk' },
      ]);
    });
};
