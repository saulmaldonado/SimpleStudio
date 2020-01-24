import React from 'react'
import { connect } from 'react-redux'
import { getNotificationsForTeacher } from '../../redux/reducers/teacherReducer'
import NotificationTeacher from './NotificationTeacher'

class NotificationFeedTeacher extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getNotificationsForTeacher(this.props.teacher.teacher_id)
    }


    render(){
        return(
            <div>
                <i className="fas fa-bell">
                    { typeof this.props.notifications === 'string' ? <div>You have no notifications.</div> : this.props.notifications.map((ele, i) => {
                        return <NotificationTeacher key={i} notification_id={ele.notification_id} notification_type={ele.notification_type} notification_title={ele.notification_title}  notification_body={ele.notification_body}  notification_time={ele.notification_time} teacher_id={ele.teacher_id} student_id={ele.student_id} /> 
                    })}
                </i>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        notifications: reduxState.teacherReducer.notifications       
    }
}

export default connect(mapStateToProps, {getNotificationsForTeacher})(NotificationFeedTeacher)