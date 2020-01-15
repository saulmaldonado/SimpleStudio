import React from 'react'

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
                    <p>{this.props.logDate}</p>
                </div>
                <div>
                    <p> {this.props.logData} </p>
                </div>

            </div>
        )
    }
}