import React from 'react'
import LogBlock from '../../LogBlock/LogBlock'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'
import moment from 'moment'

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

    timePracticedThisWeek = () => {
       const startOfWeek = moment().startOf('isoWeek')
       const endOfWeek = moment().endOf('isoWeek')

       let logsThisWeek = this.props.logs.filter(ele => {
           return moment(ele.log_date).isBetween(startOfWeek, endOfWeek)
       })

       let totalMinPracticed = logsThisWeek.reduce((acc, current) => {
            return acc + current.log_time
       }, 0)

       return totalMinPracticed
    }

    render(){
        console.log(this.props)
        
        return(
            <div>
                <div>Time practiced this week: {typeof this.props.logs === 'string' ? 0: this.timePracticedThisWeek()}</div>

                {typeof this.props.logs === 'string' ? <div>Student has not submitted a log</div> : this.props.logs.map((ele, i) => {
                    return <LogBlock key={i} studentName={`${ele.student_first_name} ${ele.student_last_name}`} logDate={ele.log_date} logTime={ele.log_time} logData={`Practiced for ${ele.log_time} minutes on ${ele.log_material}`} />
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

