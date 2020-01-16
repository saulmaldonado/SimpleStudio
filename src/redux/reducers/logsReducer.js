import axios from 'axios'

const initialState = {
    logs:[],
    loading: false
}

const ADD_LOG = 'ADD_LOG'
const GET_LOG = 'GET_LOG'
const EDIT_LOG = 'EDIT_LOG'
const DELETE_LOG = 'DELETE_LOG'

export function getLog(log_id){
    return{
        type: GET_LOG,
        payload: axios.get(`/api/log/${log_id}`)
                        .then(res => res.data)
    }
}

export function addLog(newLog){
    return{
        type: ADD_LOG,
        payload: axios.post(`/api/log`, newLog)
                        .then(res => res.data)
    }
}

export function editLog(log_id, editedLog){
  return {
    type: EDIT_LOG,
    payload: axios.put(`/api/log/${log_id}`, editedLog)
                    .then(res => res.data)
  }
}

export function deleteLog(log_id){
  return {
    type: DELETE_LOG,
    payload: axios.delete(`/api/log/${log_id}`)
  }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){

        case `${GET_LOG}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_LOG}_FULFILLED`: {
          return {
            ...state,
            logs: payload,
            loading: false
          }
        }

        case `${GET_LOG}_REJECTED`: {
          return {
            ...state,
            logs: payload.response.data,
            loading: false
          }
        }
        
        case `${ADD_LOG}_PENDING`: {
            return {
              ...state,
              loading: true
            }
          }
  
          case `${ADD_LOG}_FULFILLED`: {
            return {
              ...state,
              logs: payload,
              loading: false
            }
          }
  
          case `${ADD_LOG}_REJECTED`: {
            return {
              ...state,
              logs: payload.response.data,
              loading: false
            }
          }
          case `${EDIT_LOG}_PENDING`: {
            return {
              ...state,
              loading: true
            }
          }

          case `${EDIT_LOG}_FULFILLED`: {
            return {
              ...state,
              logs: payload,
              loading: false
            }
          }
          
          case `${EDIT_LOG}_REJECTED`: {
            return {
              ...state,
              logs: payload.response.data,
              loading: false
            }
          }

          case `${DELETE_LOG}_PENDING`: {
            return {
              ...state,
              loading: true
            }
          }

          case `${DELETE_LOG}_FULFILLED`: {
            return {
              ...state,
              logs:[],
              loading: false
            }
          }
          case `${DELETE_LOG}_REJECTED`: {
            return {
              ...state,
              loading: false
            }
          }


        default:
            return state
    }

}