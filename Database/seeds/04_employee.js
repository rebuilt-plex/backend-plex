exports.seed = async function(knex) {
    await knex('employees').insert([
        {
            id: 1,
            first_name: 'Joe',
            last_name: 'Thompson',
            department_id: 1,
            title_id: 1,
            password: '123456789',
            employee_num: '17063',
            plant_id: 1
        },
        {
            id: 2,
            first_name: 'Bobby',
            last_name: 'Hill',
            department_id: 1,
            title_id: 1,
            password: 'abcdefg',
            employee_num: '6939',
            plant_id: 2
        },
        {
            id: 3,
            first_name: 'James',
            last_name: 'Hill',
            department_id: 12,
            title_id: 3,
            password: '123456789',
            employee_num: '12125',
            plant_id: 6
        },
        {
            id: 4,
            first_name: 'Dave',
            last_name: 'Weber',
            department_id: 16,
            title_id: 3,
            password: '123456789',
            employee_num: '12126',
            plant_id: 7
        },
    ])
};
