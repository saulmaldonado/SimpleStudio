import axios from 'axios'

const initialState = {
    students: [],
    lessons: [],
    logs: [],
    payments:[],
    paymentsPaid: [],
    paymentsUnpaid: [],
    selectedStudent:[],
    loading: false
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS'
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const GET_ALL_LOGS = 'GET_ALL_LOGS'
const GET_ALL_PAYMENTS = 'GET_ALL_PAYMENTS'
const GET_ALL_PAID = 'GET_ALL_PAID'
const GET_ALL_UNPAID = 'GET_ALL_UNPAID'
const GET_STUDENT = 'GET_STUDENT'

export function getStudent(student_id){
  return {
    type: GET_STUDENT,
    payload: axios.get(`/auth/student/${student_id}`)
                      .then(res => res.data)
  }
}

export function getAllLessonsForTeacher(teacher_id){
    return {
        type: GET_ALL_LESSONS,
        payload: axios.get(`/api/teacher/${teacher_id}/lessons`)
                        .then(res => res.data)
    }
}

export function getStudentsForTeacher(teacher_id){
    return{
        type: GET_ALL_STUDENTS,
        payload: axios.get(`/api/teacher/${teacher_id}/students`)
                        .then(res => res.data)
    }
}

export function getAllLogsForTeacher(teacher_id){
    return {
        type: GET_ALL_LOGS,
        payload: axios.get(`/api/teacher/${teacher_id}/logs`)
                        .then(res => res.data)
    }
}

export function getAllPaymentsForTeacher(teacher_id){
  return {
    type: GET_ALL_PAYMENTS,
    payload: axios.get(`/api/teacher/${teacher_id}/payments`)
                    .then(res => res.data)
  }
}

export function getAllUnpaidPaymentsForTeacher(teacher_id){
    return{
      type: GET_ALL_UNPAID,
      payload: axios.get(`/api/teacher/${teacher_id}/payments/unpaid`)
                .then(res => res.data)


    }
}

export function getAllPaidPaymentsForTeacher(teacher_id){
      return {
        type: GET_ALL_PAID,
        payload: axios.get(`/api/teacher/${teacher_id}/payments/paid`)
                    .then(res => res.data)

      }

}


export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){

            case `${GET_ALL_LESSONS}_PENDING`: {
                return{
                    ...state,
                    loading: true
                }
            }

            case `${GET_ALL_LESSONS}_FULFILLED`: {
                return {
                    ...state,
                    lessons: payload,
                    loading: false

                }
            }

            case `${GET_ALL_LESSONS}_REJECTED`: {
                alert(payload.response.data)
              return {
                ...state,
                loading: false
              }
            }

            case `${GET_ALL_STUDENTS}_PENDING`: {
              return {
                    ...state,
                    loading: true
              }
            }

            case `${GET_ALL_STUDENTS}_FULFILLED`: {
              return {
                ...state,
                students: payload,
                loading: false
              }
            }

            case `${GET_ALL_LOGS}_PENDING`: {
              return {
                ...state,
                loading: true
              }
            }
            
            case `${GET_ALL_LOGS}_FULFILLED`: {
              return {
                ...state,
                logs: payload,
                loading: false
              }
            }

            case `${GET_ALL_PAYMENTS}_PENDING`: {
              return {
                ...state,
                loading: true
              }
            }

            case `${GET_ALL_PAYMENTS}_FULFILLED`: {
              return {
                ...state,
                payments: payload,
                loading: false
              }
            }

            case `${GET_STUDENT}_PENDING`: {
              return {
                ...state,
                loading: true
              }
            }

            case `${GET_STUDENT}_FULFILLED`: {
              return {
                ...state,
                selectedStudent: payload,
                loading: false
              }
            }

            case `${GET_STUDENT}_REJECTED`: {
              return {
                ...state,
                selectedStudent:`Student does not exist`,
                loading: false
              }
            }

            case `${GET_ALL_PAID}_PENDING`: {
              return {
                ...state,
                loading: true
              }
            }

            case `${GET_ALL_PAID}_FULFILLED`: {
              return {
                ...state,
                paymentsPaid: payload,
                loading: false
              }
            }
            case `${GET_ALL_PAID}_REJECTED`: {
              return {
                ...state,
                paymentsPaid: payload.response.data,
                loading: false
              }
            }

            case `${GET_ALL_UNPAID}_PENDING`: {
              return {
                ...state,
                loading: true
              }
            }
            case `${GET_ALL_UNPAID}_FULFILLED`: {
              return {
                ...state,
                paymentsUnpaid: payload,
                loading: false
              }
            }
            case `${GET_ALL_UNPAID}_REJECTED`: {
              return {
                ...state,
                paymentsUnpaid: payload.response.data,
                loading: false
              }
            }

        default:
            return state
    }

}