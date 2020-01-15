import axios from 'axios'

const initialState = {
    lessons: [],
    loading: false
}

const GET_LESSON = 'GET_LESSON'

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
            lessons: payload,
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
        


        default:
            return state
    }

}