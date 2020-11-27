exports.seed = async function(knex) {
  await knex('department').insert([
      {id: 1, name: 'Welding'},
      {id: 2, name: 'Roll-Forming'},
      {id: 3, name: 'Maintenance'},
      {id: 4, name: 'Shipping'},
      {id: 5, name: 'Spot-Welding'},
      {id: 6, name: 'Benders'},
      {id: 7, name: '3D'},
      {id: 8, name: 'Tesla'},
      {id: 9, name: 'Tesla'},
      {id: 10, name: 'Laser'},
      {id: 11, name: 'Supervision'},
      {id: 12, name: 'IT'},
      {id: 13, name: 'Production-Manager'},
      {id: 14, name: 'Engineering'},
      {id: 15, name: 'Quality'},
      {id: 16, name: 'Human-Resources'}
  ])
};
