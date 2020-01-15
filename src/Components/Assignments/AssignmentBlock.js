import  React from 'react'

export default class AssignmentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>Assignment:</div>
                <div>
                    <p> {this.props.assignmentTitle} </p>
                    <p> {this.props.assignmentDueDate} </p>
                </div>
                <div>
                    <p> {this.props.assignmentRequirements} </p>
                </div>

            </div>
        )
    }
}