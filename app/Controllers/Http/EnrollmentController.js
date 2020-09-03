'use strict'

const Database = use('Database')
const Validator = use("Validator")

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number))) 
        return { error: `param: ${number} is not supported, please use param as a number` }
        
  return {}      
}

class EnrollmentController {

    async index() {
        const enrollments = await Database.table('enrollments')

        return { status: 200, error: undefined , data: enrollments
         }
    }

    async show({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error) 
            return { status: 500, error: validatedValue.error, data: undefined }

        const enrollment = await Database
            .select('*')
            .from('enrollments')
            .where("enrollment_id",id)
            .first()

        return { status: 200, error: undefined , data: enrollment || {} }
        
    }
    async store ({request}) {
        const { mark }  = request.body
        const rules = {
            mark:'required'}

        const validation =await Validator.validate(request.body,rules)

        if(validation.fails())
            return {status:422,error: validation.messages(),data: undefined}




        const enrollmemt = await Database
            .table('enrollments')
            .insert({mark})

        return enrollmemt
    }
    async update ({request}){

        const {body, params} = request
        const {id} =params
        const { mark } = body

        const enrollmentId = await Database
            .table('enrollments')
            .where({enrollment_id: id})
            .update({mark})
 
        const enrollment = await Database
            .table('enrollments')
            .where({enrollment_id: enrollmentId})
            .first()

            return {status: 200 , error: undefined, data: enrollment
            }

    }
    async destroy ({request}){
        const {id} = request.params

        await Database.table('enrollments').where({enrollment_id: id }).delete()
        return {status: 200,error: undefined, data: {message: 'success'}}


    }


}

module.exports = EnrollmentController
