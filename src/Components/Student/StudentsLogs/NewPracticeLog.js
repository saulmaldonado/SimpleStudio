import React from 'react'
import { connect } from 'react-redux'
import {addLog} from '../../../redux/reducers/logsReducer'

class NewPracticeLog extends React.Component{
    constructor(){
        super()
        this.state={
            log_date: '',
            log_time: '',
            log_material: ''
        }
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    submitLog = () => {
        const {log_date, log_time, log_material} = this.state

        if(+log_time < 0 || !+log_time){
           return alert('Minutes practiced must be number greater then 0')
        }

        let newLog = {
            log_date,
            log_time: +log_time,
            log_material,
            student_id: this.props.student.student_id
        }
        this.props.addLog(newLog)

        this.setState({
            log_date: '',
            log_time: '',
            log_material: ''
        })
        alert('Practice Log Submitted!')
    }

    render(){
        return(
            <div>
                <div>NewPracticeLog</div>
                <input name='log_date' value={this.state.log_date} onChange={this.handelInputChange} placeholder='Date'/>
                <input name='log_time' value={this.state.log_time} onChange={this.handelInputChange} placeholder='Minutes Practiced'/>
                <input name='log_material' value={this.state.log_material} onChange={this.handelInputChange} placeholder='What did you practice?'/>
                <button onClick={this.submitLog}>Submit Log</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        logs: reduxState.logsReducer.logs       
    }
}

export default connect(mapStateToProps, {addLog})(NewPracticeLog)