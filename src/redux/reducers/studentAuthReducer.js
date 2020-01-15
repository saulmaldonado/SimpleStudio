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
const LOGOUT_STUDENT = 'LOGOUT_STUDENT'

export function registerStudent(newStudent){

    return {
        type: REGISTER_STUDENT,
        payload: axios.post('/auth/student', newStudent)
        .then(res => res.data)
    }
}

export function loginStudent(student) {
    
    return {
        type: LOGIN_STUDENT,
        payload: axios.post('/auth/student/login', student)
                        .then(res => res.data)
    }
}

export function logoutStudent(){
    return{
        type: LOGOUT_STUDENT,
        payload: axios.get('/auth/logout')
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

        case`${REGISTER_STUDENT}_REJECTED`: {
            alert(payload.response.data)
            return {
                ...state,
                loading: false
            }
        }

        case `${LOGIN_STUDENT}_PENDING`: {

            return {
                ...state,
                loading: true
            }
        }

        case `${LOGIN_STUDENT}_FULFILLED`: {

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
            alert(payload.response.data)
            return{
                ...state,
                loading: false
            }
        }

        case `${LOGOUT_STUDENT}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }

        case`${LOGOUT_STUDENT}_FULFILLED`: {
            return {
                student_id: null,
                student_first_name: '',
                student_last_name: '',
                student_email: '',
                student_phone: '',
                loading: false
            }
        }
        default:
            return state
    }
}
