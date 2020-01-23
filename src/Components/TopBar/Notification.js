import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {deleteNotificationForStudent} from '../../redux/reducers/studentReducer'

const moment = require('moment')


class Notification extends React.Component{

    acceptTeacher = async (teacher_id, student_id, notification_id) => {

        await axios.post(`/api/teacher/${teacher_id}/student/${student_id}`)
                            .then(res => {
                                alert('You have been assigned a teacher!')
                                this.props.deleteNotificationForStudent(notification_id)
                            })
    }

    closeNotification = (notification_id) => {
        this.props.deleteNotificationForStudent(notification_id)
    }

    

    render(){
        console.log(this.props)
        const {notification_type, notification_title, notification_body, teacher_id, student_id, notification_time, notification_id} = this.props
        if(notification_type === 'Assign student to Teacher'){
            return(
                <div>
                    <p>{notification_title}</p>
                    <p>{notification_body}</p>
                    <div>
                        <button onClick={() => this.acceptTeacher(teacher_id, student_id, notification_id)}>Accept</button>
                        <button onClick={() => this.closeNotification(notification_id)}>Decline</button>
                    </div>
                    <p>{moment(notification_time).format('llll')}</p>
                </div>
            )
        } else if(notification_type === 'lesson_created'){
            return (
                <div>
                    <p>{notification_title}</p>
                    <p>{notification_body}</p>
                    <div>
                        <button onClick={() => this.closeNotification(notification_id)}>Close</button>
                    </div>
                    <p>{moment(notification_time).format('llll')}</p>
                </div>
            )
        } else if(notification_type === 'lesson_resized'){
            return(
                <div>
                <p>{notification_title}</p>
                <p>{notification_body}</p>
                <div>
                    <button onClick={() => this.closeNotification(notification_id)}>Close</button>
                </div>
                <p>{moment(notification_time).format('llll')}</p>
            </div>
            )
        } else if (notification_type === 'lesson_rescheduled'){
            return(
                <div>
                    <p>{notification_title}</p>
                    <p>{notification_body}</p>
                <div>
                    <button onClick={() => this.closeNotification(notification_id)}>Close</button>
                </div>
                    <p>{moment(notification_time).format('llll')}</p>
                </div>
            )
        }
        
        return(
            <div>Notification</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        
    }
}

export default connect(mapStateToProps, {deleteNotificationForStudent})(Notification)