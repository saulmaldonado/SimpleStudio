import React from 'react'
import { connect } from 'react-redux'

import './styles/AssignmentBlockDetailed.css'

const moment = require('moment')

class AssignmentBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }




    render(){
        return(
            <div className='assignment-block-detailed'> 
                <div>
                    <div>Assignment #{this.props.assignmentCount} </div>
                </div>
                <div>
                    <p> <b>{this.props.assignmentTitle}</b> </p>
                    <p> Source: <b>{this.props.assignmentSource}</b> </p>
                    {!this.props.assignmentComposer ? null : <p>Composer: <b>{this.props.assignmentComposer}</b> </p>}
                    <p> Page: <b>{this.props.assignmentPage}</b> </p>
                    <p className='assignment-block-detailed-span' > Requirements: <br/> <b>{this.props.assignmentRequirements}</b> </p>
                    <p> Due Date: <b>{moment(this.props.assignmentDueDate).format('ll')}</b> </p>
                    <p> {!this.props.assignmentCompleted ? 'Incomplete ❌' : 'Completed ✅'} </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {

    }
}

export default connect(mapStateToProps)(AssignmentBlockDetailed)