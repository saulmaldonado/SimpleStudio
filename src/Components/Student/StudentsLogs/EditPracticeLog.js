import React from 'react'
import { connect } from 'react-redux'
import {editLog, getLog, deleteLog} from '../../../redux/reducers/logsReducer'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'

 class EditPracticeLog extends React.Component{
    constructor(){
        super()
        this.state={
            log_date:'',
            log_time:'',
            log_material:''
        }
    }

    componentDidMount(){
        this.props.getLog(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getLog(this.props.match.params.id)
        }

        if(prevProps.logs !== this.props.logs){

            this.setState({
                log_date: this.props.logs.log_date,
                log_time: this.props.logs.log_time,
                log_material: this.props.logs.log_material
            })
        }
    }

    saveChanges = (e) => {
        const {log_date, log_time, log_material} = this.state

        e.preventDefault()

        let editedLog = {
            log_date,
            log_time: +log_time,
            log_material
        }

        if(window.confirm('Are you sure you want to edit this practice log?') === true){
    
            this.props.editLog(this.props.match.params.id, editedLog)
            this.props.getLog(this.props.match.params.id)
    
            this.setState({
                log_date:'',
                log_time:'',
                log_material:''
            })
    
            alert('Practice log has been updated!')

            this.props.getAllLogsForStudent(this.props.student.student_id)

            this.props.history.push('/student/logs')
        }
    }

    deleteLog = () => {

        if(window.confirm('Are you sure you want to delete this practice log?') === true){
            this.props.deleteLog(this.props.match.params.id)
    
            this.setState({
                log_date:'',
                log_time:'',
                log_material:''
            })

            this.props.getAllLogsForStudent(this.props.student.student_id)

            this.props.history.push('/student/logs')

        }

    }

    backToCreate = () => {
        this.props.history.push('/student/logs')
    }


    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <div>EditPracticeLog</div>
                    <form onChange={this.handelInputChange} onSubmit={this.saveChanges}>
                        <input name='log_date' value={this.state.log_date || ''} onChange={this.handelInputChange} type='datetime-local' require='true'/>
                        <input type='number' name='log_time' min='5' step='5' value={this.state.log_time || ''} onChange={this.handelInputChange} placeholder='Minutes Practiced' require='true'/>
                        <textarea name='log_material' value={this.state.log_material || ''} onChange={this.handelInputChange} placeholder='What did you practice?' require='true'/>
                        <input type='submit' value='Submit Practice Log'/>
                        <button type='button' onClick={this.deleteLog}> Delete Practice Log</button>
                    </form>
                    <button onClick={this.backToCreate}>Back</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        logs: reduxState.logsReducer.logs[0]
    }
}
export default connect(mapStateToProps, {editLog, getLog, deleteLog, getAllLogsForStudent})(EditPracticeLog)