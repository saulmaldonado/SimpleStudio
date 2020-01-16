import React from 'react'
import LogBlockStudent from '../../LogBlock/LogBlockStudent'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'

class StudentLogsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllLogsForStudent(this.props.student.student_id)
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <div>Practice Logs</div>

                {this.props.logs.map((ele, i) => {
                    return <LogBlockStudent key={i} logCount={i + 1} logDate={ele.log_date} logTime={ele.log_time} logData={ele.log_material} />
                })}
               
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        logs: reduxState.studentReducer.logs       
    }
}

export default connect (mapStateToProps, {getAllLogsForStudent})(StudentLogsContainer)