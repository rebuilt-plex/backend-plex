exports.seed = async function(knex) {
    await knex('employees').del()
    await knex('employees').insert([
        {
            id: 1,
            first_name: 'Joe',
            last_name: 'Thompson',
            department_id: 1,
            title_id: 7,
            password: '123456789'
        },
        {
            id: 2,
            first_name: 'Bobby',
            last_name: 'Hill',
            department_id: 5,
            title_id: 12,
            password: 'abcdefg'
        },
        {
            id: 3,
            first_name: 'James',
            last_name: 'Hill',
            department_id: 12,
            title_id: 3,
            password: '123456789'
        },
    ])
};
