'use strict'

const Database = use('Database')
const Subject = use('App/Models/Subject')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}

class SubjectController {

    async index({ request }) {
        const { references = undefined} = request.qs

        const subject = Subject.query()

        if(references){
            const extractedReferences = references.split(",")
            subjects.with(extractedReferences)
        }
            

        return { status: 200, error: undefined , data: await subjects.fetch() }
    }

    async show({ request }){
        const { id } = request.body
        const subject = await Subject.find(id)

        return { status: 200, error: undefined , data: subject || {} }
        
    }

    async store ({request}) {
        const { title, teacher_id}  = request.body

        // const subject = new Subject()
        // subject.title = title
        // subject.Teacher_id = teacher_id
        // await subject.save()
        const subject = await Subject.create({ title, teacher_id })

        return { status: 200, error: undefined , data: subject }
    }

    async update ({request}){

        const {body, params} = request
        const {id} =params
        const { title } = body

        const subjectId = await Database
            .table('subjects')
            .where({subject_id: id})
            .update({title})
 
        const subject = await Database
            .table('subjects')
            .where({subject_id: subjectId})
            .first()

            return {status: 200 , error: undefined, data: subject
            }
    }

    async destroy ({request}){
        const {id} = request.params

        await Database.table('subjects').where({subject_id: id }).delete()
        return {status: 200,error: undefined, data: {message: 'success'}}
    }

    async showTeacher({ request }) {
        const { id } = request.params
        const subject = await Database
            .table('subjects')
            .where({ subject_id: id })
            .innerJoin('teachers', 'subject.teacher_id', 'teachers.teacher_id')
            .first()

        return {status: 200, error: undefined, data: subject || {} }
    }
}

module.exports = SubjectController
