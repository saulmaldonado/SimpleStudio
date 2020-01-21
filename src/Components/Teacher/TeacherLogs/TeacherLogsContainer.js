import React from 'react'
import LogBlock from '../../LogBlock/LogBlock'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'

class TeacherLogsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllLogsForStudent(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getAllLogsForStudent(this.props.match.params.id)
        }
    }




    render(){
        console.log(this.props)
        return(
            <div>
                <div>TeacherLogsContainer</div>

                {!this.props.logs.length ? <div>Student had no logs</div> : this.props.logs.map((ele, i) => {
                    return <LogBlock key={i} studentName={`${ele.student_first_name} ${ele.student_last_name}`} logDate={ele.log_date} logTime={ele.log_time} logData={ele.log_material} />
                })}

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        logs: reduxState.studentReducer.logs,
    }
}

export default connect(mapStateToProps, {getAllLogsForStudent})(TeacherLogsContainer)

