import React from 'react'
import {connect} from 'react-redux'
import {getAllLogsForTeacher} from '../../../redux/reducers/teacherReducer'
import LogBlock from '../../LogBlock/LogBlock'

import './styles/TeacherNewLogs.css'

class TeacherNewLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllLogsForTeacher(this.props.teacher.teacher_id)
    }


    render(){
        return(
            <div className='teacher-new-logs' >
                <h3>Submitted Practice Logs</h3>
                <div className='teacher-new-logs-container' >
                    {this.props.teacherInfo.map((ele, i) => {
                        return <LogBlock key={i} studentName={`${ele.student_first_name} ${ele.student_last_name}`} logDate={ele.log_date} logData={`${ele.log_time} minutes on ${ele.log_material}`}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        teacherInfo: reduxState.teacherReducer.logs
    }
}

export default connect(mapStateToProps, {getAllLogsForTeacher})(TeacherNewLogs)
