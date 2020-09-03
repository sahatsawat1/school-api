'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTeacherSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments('teacher_id')
      table.string('first_name',120).notNullable()
      table.string('lest_name',120).notNullable()
      table.string('email',120).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('teachers')
  }
}

module.exports = CreateTeacherSchema
