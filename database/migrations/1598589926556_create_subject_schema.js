'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSubjectSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.integer('subject_id')
      table.string('title',120).notNullable().unique()
      table.integer('teacher_id').notNullable().unsigned()

      table
        .foreign('teacher_id')
        .references('teachers.teacher_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = CreateSubjectSchema
