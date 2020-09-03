'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments('student_id')
      table.string('first_name',120).notNullable()
      table.string('last_name',120).notNullable()
      table.string('email',120).notNullable().unique() // default length
      table.integer('password').notNullable()
      table.integer('group_id').unsigned() // convert group_id to unsigned integer
      table.timestamps()// auto create 2 cloumn -> create_at , update_at

      table
        .foreign('group_id')
        .references('groups.group_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = CreateStudentSchema
