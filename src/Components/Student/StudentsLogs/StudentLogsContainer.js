import React from 'react'
import LogBlockStudent from '../../LogBlock/LogBlockStudent'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
                <div>{this.props.student.student_first_name}'s Practice Logs:</div>

                {typeof this.props.logs === 'string' ? <div>{this.props.logs}</div> : this.props.logs.map((ele, i) => {
                    return <Link key={i} to={`/student/logs/edit/${ele.log_id}`}><LogBlockStudent  logCount={i + 1} logDate={ele.log_date} logTime={ele.log_time} logData={ele.log_material} /> </Link>
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