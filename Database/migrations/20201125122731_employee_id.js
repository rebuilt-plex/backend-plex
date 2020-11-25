
exports.up = async function(knex) {
  await knex.schema.table('employees', emp => {
      emp.string('employee_num').notNullable().unique();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('employees')
};
