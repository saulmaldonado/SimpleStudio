import axios from 'axios'

const initialState = {
    student_id: null,
    student_first_name: '',
    student_last_name: '',
    student_email: '',
    student_phone: '',
    loading: false
}

const REGISTER_STUDENT = 'REGISTER_STUDENT'
const LOGIN_STUDENT = 'LOGIN_STUDENT'

export function registerStudent(newStudent){
    let data = axios.post('/auth/student', newStudent)
                    .then(res => res.data)
    return {
        type: REGISTER_STUDENT,
        payload: data
    }
}

export function loginStudent(student) {
    
    return {
        type: LOGIN_STUDENT,
        payload: axios.post('/auth/teacher/login', student)
                        .then(res => res.data)
    }
}


export default function reducer(state = initialState, action ){
    const { payload, type } = action
    switch (type){
        case `${REGISTER_STUDENT}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }

        case `${REGISTER_STUDENT}_FULFILLED`: {

            return{
                ...state,
                student_id: payload.user_id,
                student_first_name: payload.first_name,
                student_last_name: payload.last_name,
                student_email: payload.email,
                student_phone: payload.phone,
                loading: false
            }
        }

        case `${LOGIN_STUDENT}_PENDING`: {
            console.log('pending')

            return {
                ...state,
                loading: true
            }
        }

        case `${LOGIN_STUDENT}_FULFILLED`: {
            console.log('fulfilled')

            return {
                ...state,
                student_id: payload.user_id,
                student_first_name: payload.first_name,
                student_last_name: payload.last_name,
                student_email: payload.email,
                student_phone: payload.phone,
                loading: false
            }
        }

        case `${LOGIN_STUDENT}_REJECTED`: {
            console.log('rejected')
            return{
                ...state,
                loading: false
            }
        }
        default:
            return state
    }
}
