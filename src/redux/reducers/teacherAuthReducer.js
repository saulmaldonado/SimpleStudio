import axios from 'axios'

const initialState = {
    teacher_id: null,
    teacher_first_name: '',
    teacher_last_name: '',
    teacher_email: '',
    teacher_phone: '',
    loading: false
}

const REGISTER_TEACHER = 'REGISTER_TEACHER'
const LOGIN_TEACHER = 'LOGIN_TEACHER'

export function registerTeacher(newTeacher){
    let data = axios.post('/auth/teacher', newTeacher)
                    .then(res => res.data)
    return {
        type: REGISTER_TEACHER,
        payload: data
    }
}

export function loginTeacher(teacher){
    let data = axios.post('/auth/teacher/login', teacher)
                    .then(res => res.data)
    return {
        type: LOGIN_TEACHER,
        payload: data
    }
}


export default function reducer(state = initialState, action ){
    const { payload, type } = action
    switch (type){
        case `${REGISTER_TEACHER}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }

        case `${REGISTER_TEACHER}_FULFILLED`: {
            return{
                ...state,
                teacher_id: payload.user_id,
                teacher_first_name: payload.first_name,
                teacher_last_name: payload.last_name,
                teacher_email: payload.email,
                teacher_phone: payload.phone,
                loading: false
            }
        }

        case `${LOGIN_TEACHER}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }

        case `${LOGIN_TEACHER}_FULFILLED`: {
            return {
                ...state,
                teacher_id: payload.user_id,
                teacher_first_name: payload.first_name,
                teacher_last_name: payload.last_name,
                teacher_email: payload.email,
                teacher_phone: payload.phone,
                loading: false
            }
        }
        default:
            return state
    }
}
