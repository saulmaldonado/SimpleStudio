import axios from 'axios'

const initialState = {
    assignments: [],
    loading: false
}

const GET_ASSIGNMENT = 'GET_ASSIGNMENT'
const NEW_ASSIGNMENT = 'NEW_ASSIGNMENT'
const EDIT_ASSIGNMENT = 'EDIT_ASSIGNMENT'
const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'

export function getAssignment(assignment_id){
    return{
        type: GET_ASSIGNMENT,
        payload: axios.get(`/api/assignment/${assignment_id}`)
                        .then(res => res.data)
    }
}

export function addAssignment(newAssignment){
    return {
        type: NEW_ASSIGNMENT,
        payload: axios.post('api/assignment', newAssignment)
    }
}

export function editAssignment(assignment_id, editedAssignment){
    return {
        type: EDIT_ASSIGNMENT,
        payload: axios.put(`/api/assignment/${assignment_id}`, editedAssignment)
    }
}


export function deleteAssignment(assignment_id){
    return {
        type: DELETE_ASSIGNMENT,
        payload: axios.delete(`/api/assignment/${assignment_id}`)
    }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){
        case `${GET_ASSIGNMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${GET_ASSIGNMENT}_FULFILLED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        case `${GET_ASSIGNMENT}_REJECTED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        case `${NEW_ASSIGNMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${NEW_ASSIGNMENT}_FULFILLED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        case `${NEW_ASSIGNMENT}_REJECTED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        case `${EDIT_ASSIGNMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${EDIT_ASSIGNMENT}_FULFILLED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        case `${DELETE_ASSIGNMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${DELETE_ASSIGNMENT}_FULFILLED`: {
          return {
            ...state,
            assignments: payload,
            loading: false
          }
        }
        


        default:
            return state
    }

}