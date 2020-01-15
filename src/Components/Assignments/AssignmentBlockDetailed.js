import React from 'react'

export default class AssignmentBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>Assignment {this.props.assignmentCount} </div>
                <div>
                    <p> Assignment: {this.props.assignmentTitle} </p>
                    <p> Source: {this.props.assignmentSource} </p>
                    <p> Composer: {this.props.assignmentComposer} </p>
                    <p> {this.props.assignmentPage} </p>
                    <p> Requirements: {this.props.assignmentRequirements} </p>
                    <p> Due Date: {this.props.assignmentDueDate} </p>
                    <p> {!this.props.assignmentCompleted ? 'Incomplete ❌' : 'Completed ✅'} </p>
                </div>

            </div>
        )
    }
}