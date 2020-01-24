import React from 'react'

const moment = require('moment')

export default class LogBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>
                    <p>Student: {this.props.studentName}</p>
                    <p>{moment(this.props.logDate).format('llll')}</p>
                </div>
                <div>
                    <p> {this.props.logTime} minutes </p>
                    <p> {this.props.logData} </p>
                </div>

            </div>
        )
    }
}