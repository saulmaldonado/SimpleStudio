import axios from 'axios'

const initialState = {
    lessons: [],
    assignments: [],
    paymentsDue: [],
    loading: false
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS'
const GET_ALL_ASSIGNMENTS = 'GET_ALL_ASSIGNMENTS'
const GET_ALL_PAYMENTS_DUE = 'GET_ALL_PAYMENTS_DUE'

export function getAllLessons (student_id) {
    return {
        type: GET_ALL_LESSONS,
        payload: axios.get(`api/student/${student_id}/lessons`)
                        .then(res => res.data)
    }
}
export function getAllAssignments(student_id){
    return {
        type: GET_ALL_ASSIGNMENTS,
        payload: axios.get(`api/student/${student_id}/assignments`)
                        .then(res => res.data)
    }
}

export function getAllPaymentsDue(student_id){
    return {
        type: GET_ALL_PAYMENTS_DUE,
        payload: axios.get(`api/student/${student_id}/payments/due`)
                        .then(res => res.data)
    }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){
        case `${GET_ALL_LESSONS}_PENDING`: {
          return {
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
          return {
            ...state,
            lessons: payload.response.data,
            loading: false
          }
        }

        case `${GET_ALL_ASSIGNMENTS}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_ALL_ASSIGNMENTS}_FULFILLED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }

        case `${GET_ALL_PAYMENTS_DUE}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_ALL_PAYMENTS_DUE}_FULFILLED`: {
          return {
            ...state,
            paymentsDue: payload,
            loading: false
          }
        }

        case `${GET_ALL_PAYMENTS_DUE}_REJECTED`: {

          return {
            ...state,
            paymentsDue: payload.response.data,
            loading: false
          }
        }
    
        default:
            return state
    }

}

