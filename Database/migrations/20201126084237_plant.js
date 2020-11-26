
exports.up = async function(knex) {
  await knex.schema.createTable('plant', plant => {
      plant.increments('id');
      plant.string('location');
      plant.string('name');
  });

  await knex.schema.table('employees', emp => {
      emp.integer('plant_id').unsigned();
      emp.foreign('plant_id').references('plant.id')
  });

  await knex.schema.createTable('plant_department', table => {
      table.integer('plant_id').unsigned();
      table.foreign('plant_id').references('plant.id');
      table.integer('department_id').unsigned();
      table.foreign('department_id').references('department.id');
  });

};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('plant_department');
  await knex.schema.dropTableIfExists('employees');
  await knex.schema.dropTableIfExists('plant');
};
