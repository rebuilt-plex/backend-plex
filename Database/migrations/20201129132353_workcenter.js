
exports.up = async function(knex) {
  await knex.schema.createTable('status', stat => {
     stat.increments('id');
     stat.string('name');
     stat.integer('department_id').unsigned();
     stat.foreign('department_id').references('department.id');
  });

  await knex.schema.createTable('workcenter', wc => {
      wc.increments('id');
      wc.string('name').notNullable().unique();
      wc.integer('plant_id').unsigned();
      wc.foreign('plant_id').references('plant.id');
      wc.integer('status_id').unsigned();
      wc.foreign('status_id').references('status.id');
      wc.integer('department_id').unsigned();
      wc.foreign('department_id').references('department.id');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('workcenter');
  await knex.schema.dropTableIfExists('status');
};
