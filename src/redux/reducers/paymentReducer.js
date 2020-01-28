import axios from 'axios'

const initialState = {
    payments: [],
    paymentSelected:[]
}

const GET_PAYMENT = 'GET_PAYMENT'
const NEW_PAYMENT = 'NEW_PAYMENT'
const EDIT_PAYMENT = 'EDIT_PAYMENT'
const DELETE_PAYMENT = 'DELETE_PAYMENT'
const PAY_PAYMENT = 'PAY_PAYMENT'

export function getPayment(payment_id){
    return {
        type: GET_PAYMENT,
        payload: axios.get(`/api/payment/${payment_id}`)
                        .then(res => res.data)
    }
}

export function createPayment(newPayment){
    return {
        type: NEW_PAYMENT,
        payload: axios.post('/api/payment/', newPayment)
                        .then (res => res.data)
    }
}

export function editPayment(payment_id, editedPayment){
    return {
        type: EDIT_PAYMENT,
        payload: axios.put(`/api/payment/${payment_id}`, editedPayment)
                        .then(res => res.data)
    }
}

export function deletePayment(payment_id){
    return{
        type: DELETE_PAYMENT,
        payload: axios.delete(`/api/payment/${payment_id}`)
                        .then(res => res.data)
    }
}

export function payPayment(payment_id){
  return {
    type: PAY_PAYMENT,
    payload: axios.put(`/api/payment/pay/${payment_id}`)
                    .then(res => res.data)
  }
}

export default function reducer(state = initialState, action){
    const { payload, type } = action

    switch(type){
        case `${GET_PAYMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${GET_PAYMENT}_FULFILLED`: {
          return {
            ...state,
            paymentSelected: payload,
            loading: false
          }
        }

        case `${GET_PAYMENT}_REJECTED`: {
          return {
            ...state,
            loading: true
          }
        }

        case `${NEW_PAYMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${NEW_PAYMENT}_FULFILLED`: {
          return {
            ...state,
            payments: [],
            loading: false
          }
        }
        case `${NEW_PAYMENT}_REJECTED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${EDIT_PAYMENT}_PENDING`: {
          return {
              ...state,
              loading: true
          }
        }
        case `${EDIT_PAYMENT}_FULFILLED`: {
          return {
            ...state,
            payments: payload,
            loading: false
          }
        }
        case `${EDIT_PAYMENT}_REJECTED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${DELETE_PAYMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${DELETE_PAYMENT}_FULFILLED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${DELETE_PAYMENT}_REJECTED`: {
          return {
            ...state,
            loading: false
          }
        }
        case `${PAY_PAYMENT}_PENDING`: {
          return {
            ...state,
            loading: true
          }
        }
        case `${PAY_PAYMENT}_FULFILLED`: {
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