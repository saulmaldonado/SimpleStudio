import React from 'react'
import { connect } from 'react-redux'
import {editLog, getLog, deleteLog} from '../../../redux/reducers/logsReducer'
import { Redirect } from 'react-router-dom'

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

    saveChanges = () => {
        const {log_date, log_time, log_material} = this.state

        let editedLog = {
            log_date,
            log_time: +log_time,
            log_material
        }

        this.props.editLog(this.props.match.params.id, editedLog)
        this.props.getLog(this.props.match.params.id)

        this.setState({
            log_date:'',
            log_time:'',
            log_material:''
        })

        alert('Practice log has been updated!')
    }

    deleteLog = () => {

        this.props.deleteLog(this.props.match.params.id)

        this.setState({
            log_date:'',
            log_time:'',
            log_material:''
        })

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
                <div>
                    <input name='log_date' value={this.state.log_date} onChange={this.handelInputChange} placeholder='Date'/>
                    <input name='log_time' value={this.state.log_time} onChange={this.handelInputChange} placeholder='Minutes Practiced'/>
                    <input name='log_material' value={this.state.log_material} onChange={this.handelInputChange} placeholder='What did you practice?'/>
                    <button onClick={this.saveChanges}>Save Changes</button>
                    <button onClick={this.deleteLog}>Delete Practice Log</button>
                </div>
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
export default connect(mapStateToProps, {editLog, getLog, deleteLog})(EditPracticeLog)