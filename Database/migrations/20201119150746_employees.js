
exports.up = async function(knex) {
 await knex.schema.createTable('department', dep => {
     dep.increments('id').notNullable().primary();
     dep.string('name').notNullable();
 });

 await knex.schema.createTable('title', title => {
    title.increments('id').primary().notNullable();
    title.string('name').notNullable();
 });

  await knex.schema.createTable('employees', emp => {
      emp.increments('id');
      emp.string('first_name');
      emp.string('last_name');
      emp.integer('department_id').unsigned();
      emp.foreign('department_id').references('department.id');
      emp.integer('title_id').unsigned();
      emp.foreign('title_id').references('title.id');
      emp.string('password').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('department')
  await knex.schema.dropTableIfExists('title')
  await knex.schema.dropTableIfExists('employees')
};
