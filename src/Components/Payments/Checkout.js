import React from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import PaymentPage from './PaymentPage'
import { connect } from 'react-redux'
import {getPayment} from '../../redux/reducers/paymentReducer'


 class Checkout extends React.Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getPayment(this.props.match.params.id)
    }


        render(){
            console.log(this.props)
            return(
            <StripeProvider apiKey="pk_test_PA4jhxW0nTDVFLHQLKcjtxZT00QLDq7e3w" >
                <div className='example'>
                    <Elements>
                        <PaymentPage payment_id={this.props.match.params.id} />
                    </Elements>
                </div>
            </StripeProvider>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer       
    }
}

export default connect(mapStateToProps, {getPayment})(Checkout)