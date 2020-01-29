import React from 'react'
import './styles/LogBlock.css'

const moment = require('moment')

export default class LogBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='log-block' > 
                <div>
                    <p>Student: <b> {this.props.studentName} </b> </p>
                    <p> <b> {moment(this.props.logDate).format('llll')} </b> </p>
                </div>
                <div className='log-block-data' >
                    <p> {this.props.logData} </p>
                </div>

            </div>
        )
    }
}