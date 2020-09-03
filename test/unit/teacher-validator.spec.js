'use strict'

const { test } = use('Test/Suite')('Teacher Validator')
const teacherValidator = require('../../service/TeacherValidator')

test('should return error when pass incorrect data', async ({ assert }) => {
  const validatedData = await teacherValidator("John", "Doe", "wrog email", "123434556")
  assert.isArray(validatedData.error)
})

test('should return morn then one error if nutiple incorrect data is pass', async ({ assert }) => {
  const validatedData = await teacherValidator("John", "Doe", "wrog email", "123434556")
  assert.isAbove(validatedData.error.length,1)
})

test('should return only one error if single incorrect data is pass', async ({ assert }) =>{
  const validatedData = await teacherValidator({
    first_name:'john',
    last_name:'Doe',
    email:'dfdfj@gmail.com',
    password:'1515313545'
  })

  assert.isOk(validatedData)

  const validatedData2 = await teacherValidator("John", "Doe", "wrog email", "123434556")
  assert.isNotOk(validatedData2)
})

test('should return undefined when pass incorrect data', async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name:'john',
    last_name:'Doe',
    email:'dfdfj@gmail.com',
    password:'1515313545'
  })
  assert.equal(validatedData.error, undefined)
})

