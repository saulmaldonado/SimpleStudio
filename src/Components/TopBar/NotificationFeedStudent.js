import React from 'react'
import { connect } from 'react-redux'
import { getNotificationsForStudent } from '../../redux/reducers/studentReducer'
import Notification from './Notification'
import './styles/NotificationFeedStudent.css'

class NotificationFeedStudent extends React.Component{
    constructor(){
        super()
        this.state={
            openMenu:'notifications-list-closed',
            newNotification: ''
        }
    }

    bellClicked = () =>{
        if(this.state.newNotification === true) {
            this.setState({
                newNotification: false
            })
        }

        if(this.state.openMenu ==='notifications-list-closed'){
            this.setState({
                openMenu: 'notifications-list-open'
            })

        } else {
            this.setState({
                openMenu: 'notifications-list-closed'
            })
        }
    }
    async componentDidMount(){
        await this.props.getNotificationsForStudent(this.props.student.student_id)

        if(this.props.notifications.length > 0){
            this.setState({
                newNotification: true
            })
        }

    }




    render(){
        return(
            <div>
                <div className={this.state.newNotification ? 'new-notifications':  'no-notifications'} >
                    <i className="fas fa-exclamation"></i>
                </div>
                <i onClick={this.bellClicked} className="fas fa-bell"></i>
                <div className={this.state.openMenu} >
                    { typeof this.props.notifications === 'string' ? <div>You have no notifications.</div> : this.props.notifications.map((ele, i) => {
                        return <Notification key={i} notification_id={ele.notification_id} notification_type={ele.notification_type} notification_title={ele.notification_title}  notification_body={ele.notification_body}  notification_time={ele.notification_time} teacher_id={ele.teacher_id} student_id={ele.student_id} /> 
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        notifications: reduxState.studentReducer.notifications,
        notifications2: reduxState.teacherReducer.notifications   
    }
}

export default connect(mapStateToProps, {getNotificationsForStudent})(NotificationFeedStudent)