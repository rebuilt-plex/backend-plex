
exports.up = async function(knex) {
  await knex.schema.table('employees', emp => {
     emp.integer('workcenter_id').unsigned();
     emp.foreign('workcenter_id').references('workcenter.id')
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('employees')
};
