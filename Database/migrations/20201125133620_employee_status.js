
exports.up = async function(knex) {
  await knex.schema.table('employees', emp => {
      emp.boolean('clocked_in').defaultTo(false)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('employees')
};
