
exports.seed = async function(knex) {
    await knex('plant_department').del();
    await knex('employees').del();
    await knex ('workcenter').del();
    await knex('plant').del();
    await knex('title').del();
    await knex('status').del();
    await knex('department').del();
};
