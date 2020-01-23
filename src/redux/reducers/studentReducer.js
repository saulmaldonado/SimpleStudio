import axios from 'axios'

const initialState = {
    lessons: [],
    assignments: [],
    paymentsDue: [],
    teacher:[],
    payments:[],
    logs:[],
    notifications:[],
    loading: false
}

const GET_ALL_LESSONS = 'GET_ALL_LESSONS'
const GET_ALL_ASSIGNMENTS = 'GET_ALL_ASSIGNMENTS'
const GET_ALL_PAYMENTS_DUE = 'GET_ALL_PAYMENTS_DUE'
const GET_TEACHER = 'GET_TEACHER'
const GET_ALL_PAYMENTS = 'GET_ALL_PAYMENTS'
const GET_ALL_LOGS = 'GET_ALL_LOGS'
const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
const NEW_NOTIFICATION = 'NEW_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'


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

export function getAllPayments(student_id){
  return {
    type: GET_ALL_PAYMENTS,
    payload: axios.get(`/api/student/${student_id}/payments`)
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

export function getTeacherForStudent(student_id){
    return {
        type: GET_TEACHER,
        payload: axios.get(`api/student/${student_id}/teacher`)
                        .then(res => res.data)
    }
}

export function getAllLogsForStudent(student_id){
  return{
    type: GET_ALL_LOGS,
    payload: axios.get(`/api/student/${student_id}/logs`)
                    .then(res => res.data)
  }
}

export function getNotificationsForStudent(student_id){
  return {
    type: GET_NOTIFICATIONS,
    payload: axios.get(`student/notifications/${student_id}`)
                    .then(res => res.data)
  }
}

export function CreateNotificationForStudent(student_id, newNotification){
  return {
    type: NEW_NOTIFICATION,
    payload: axios.post(`student/notifications/${student_id}`, newNotification)
                      .then(res => res.data)
  }
}

export function deleteNotificationForStudent(notification_id){
  return {
    type: DELETE_NOTIFICATION,
    payload: axios.delete(`student/notifications/${notification_id}`)
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

        case `${GET_TEACHER}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_TEACHER}_FULFILLED`: {
          return {
            ...state,
            teacher: payload,
            loading: false
          }
        }

        case `${GET_TEACHER}_REJECTED`: {
          return {
            ...state,
            teacher: payload.response.data,
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

        case `${GET_ALL_PAYMENTS}_REJECTED`: {
          return {
            ...state,
            payments: payload.response.data,
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

        case `${GET_ALL_LOGS}_REJECTED`: {

          return {
            ...state,
            logs: payload.response.data,
            loading: false
          }
        }

        case `${GET_NOTIFICATIONS}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_NOTIFICATIONS}_FULFILLED`: {
          return {
            ...state,
            notifications: payload,
            loading: false
          }
        }

        case `${NEW_NOTIFICATION}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${NEW_NOTIFICATION}_FULFILLED`: {
          return {
            ...state,
            notifications: payload,
            loading: false
          }
        }

        case `${DELETE_NOTIFICATION}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${DELETE_NOTIFICATION}_FULFILLED`: {
          return {
            ...state,
            notifications: payload,
            loading: false
          }
        }
    
        default:
            return state
    }

}

