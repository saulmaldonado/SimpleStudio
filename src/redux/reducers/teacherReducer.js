import axios from 'axios'

const initialState = {
    students: [],
    lessons: [],
    logs: [],
    payments:[],
    loading: false
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS'
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const GET_ALL_LOGS = 'GET_ALL_LOGS'
const GET_ALL_PAYMENTS = 'GET_ALL_PAYMENTS'

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

        default:
            return state
    }

}