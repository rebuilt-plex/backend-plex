exports.seed = async function(knex) {
    await knex('status').insert([
        {id: 1, department_id: 3, name: 'Reteach'},
        {id: 2, department_id: 3, name: 'Troubleshoot Robot'},
        {id: 3, department_id: 3, name: 'Fixture Adjustment'},
        {id: 4, department_id: 3, name: 'Troubleshoot Welder'},
        {id: 5, department_id: 9, name: 'Wire Barrel Change'},
        {id: 6, department_id: 9, name: 'Part Check'},
        {id: 7, department_id: 9, name: 'Scheduled Downtime'},
        {id: 8, department_id: 9, name: 'Personal Break'},
        {id: 9, department_id: 9, name: 'PM: Cleaning'},
        {id: 10, department_id: 9, name: 'PM: Stocking'},
        {id: 11, department_id: 19, name: 'Hilo Requested'},
        {id: 12, department_id: 11, name: 'Supervisor Requested'},
        {id: 13, department_id: 15, name: 'Quality Requested'},
        {id: 14, department_id: 14, name: 'Engineering Requested'},
        {id: 15, department_id: 17, name: 'Troubleshoot'},
        {id: 16, department_id: 17, name: 'Replace Prox'},
        {id: 17, department_id: 18, name: 'Troubleshoot'},
        {id: 18, department_id: 18, name: 'Mechanical Requested'},
        {id: 19, department_id: 17, name: 'Electrical Requested'},
        {id: 20, department_id: 3, name: 'Weld Tech Requested'},
    ])
};
