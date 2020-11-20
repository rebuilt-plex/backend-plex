exports.seed = async function(knex) {
    await knex('title').del()
    await knex('title').insert([
        {id: 1, name: 'Welder'},
        {id: 2, name: 'Roll-Former'},
        {id: 3, name: 'Weld-Tech'},
        {id: 4, name: 'Mechanical-Tech'},
        {id: 5, name: 'Electrical-Tech'},
        {id: 6, name: 'General-Labor'},
        {id: 7, name: 'Weld-Tech 1'},
        {id: 9, name: 'Weld-Tech-Trainee'},
        {id: 10, name: 'Operator'},
        {id: 11, name: 'Supervisor'},
        {id: 12, name: 'Team-Lead'},
        {id: 13, name: 'Production-Manager'},
        {id: 14, name: 'Engineer'},
        {id: 15, name: 'Hilo-Driver'},
        {id: 16, name: 'Lube-Tech'},
        {id: 17, name: 'Tool-Room-Tech'},
        {id: 18, name: 'Machinist'},
        {id: 19, name: 'Press-Operator'},
        {id: 20, name: 'Bender-Tech'},
        {id: 21, name: '3D-Tech'},
        {id: 22, name: 'Tesla-Tech'},
        {id: 23, name: 'Laser-Tech'},
        {id: 24, name: 'Quality-Tech'},
        {id: 25, name: 'Roll-Form-Expert'},
        {id: 26, name: 'Backup-TL'}
    ])
};
