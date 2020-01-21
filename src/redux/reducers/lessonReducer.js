import axios from 'axios'

const initialState = {
    lessons: [],
    loading: false
}

const GET_LESSON = 'GET_LESSON'
const NEW_LESSON = 'NEW_LESSON'
const DELETE_LESSON = 'DELETE_LESSON'

export function getLesson(lesson_id){
    return{
        type: GET_LESSON,
        payload: axios.get(`/api/lesson/${lesson_id}`)
                        .then(res => res.data)
    }
}

export function editLesson(lesson_id, updatedLesson){
    return {
        type: GET_LESSON,
        payload: axios.put(`/api/lesson/${lesson_id}`, updatedLesson)
                        .then(res => res.data)
    }
}

export function createLesson(newLesson){
  return {
      type: NEW_LESSON,
      payload: axios.post('/api/lesson', newLesson)
                  .then(res => res.data)
  }
}

export function deleteLesson(lesson_id){
  return {
    type: DELETE_LESSON,
    payload: axios.delete(`/api/lesson/${lesson_id}`)
                  .then(res => res.data)
  }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){

        case `${GET_LESSON}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_LESSON}_FULFILLED`: {
          return {
            ...state,
            lessons: [...payload],
            loading: false
          }
        }

        case `${GET_LESSON}_REJECTED`: {

          return {
            ...state,
            lessons: 'error',
            loading: false
          }
        }  
        
        case `${NEW_LESSON}_PENDING`: {
          return {
            ...state,
            loading: true
        
          }
        }

        case `${NEW_LESSON}_FULFILLED`: {
          return {
            ...state,
            loading:false
          }
        }

        case `${NEW_LESSON}_REJECTED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${DELETE_LESSON}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${DELETE_LESSON}_FULFILLED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${DELETE_LESSON}_REJECTED`: {
          return {
            ...state,
            loading: false
          }
        }
        


        default:
            return state
    }

}