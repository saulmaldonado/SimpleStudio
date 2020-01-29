import  React from 'react'

import './styles/AssignmentBlock.css'

const moment = require('moment')

export default class AssignmentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='AssignmentBlock' >
                <div>
                    <p>Title: <b>{this.props.assignmentTitle}</b> </p>
                    <p> Due : <b>{moment(this.props.assignmentDueDate).format('MMM Do')}</b> </p>
                </div>
                <div>
                    <p>Requirements: <b>{this.props.assignmentRequirements}</b> </p>
                </div>

            </div>
        )
    }
}