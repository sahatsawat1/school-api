'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEnrollmentSchema extends Schema {
  up () {
    this.create('enrollments', (table) => {
      table.increments('enrollment_id')
      table.float('mark').default(0)
      table.timestamp('mark_date').default(this.fn.now())
      table.timestamps()
      table.integer('student_id').notNullable().unsigned()
      table.integer('subject_id').notNullable().unsigned()
      
      

      table
        .foreign('student_id')
        .references('students.student_id')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CACASE
      table
        .foreign('subject_id')
        .references('subjects.subject_id')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CACASE
    })
  }

  down () {
    this.drop('enrollments')
  }
}

module.exports = CreateEnrollmentSchema
