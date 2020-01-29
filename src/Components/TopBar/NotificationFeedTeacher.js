import React from 'react'
import { connect } from 'react-redux'
import { getNotificationsForTeacher } from '../../redux/reducers/teacherReducer'
import NotificationTeacher from './NotificationTeacher'

import './styles/NotificationFeedTeacher.css'
class NotificationFeedTeacher extends React.Component{
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
        await this.props.getNotificationsForTeacher(this.props.teacher.teacher_id)

        if(this.props.notifications.length > 0){
            this.setState({
                newNotification: true
            })
        }

    }


    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div>
                <div className={this.state.newNotification ? 'new-notifications':  'no-notifications'} >
                    <i className="fas fa-exclamation"></i>
                </div>
                <i onClick={this.bellClicked} className="fas fa-bell"></i>
                <div className={this.state.openMenu} >
                    {typeof this.props.notifications === 'string' ? <div >You have no notifications.</div> : this.props.notifications.map((ele, i) => {
                        return <NotificationTeacher key={i} notification_id={ele.notification_id} notification_type={ele.notification_type} notification_title={ele.notification_title}  notification_body={ele.notification_body}  notification_time={ele.notification_time} teacher_id={ele.teacher_id} student_id={ele.student_id} lesson_id={ele.lesson_id} lesson_time={ele.lesson_time} lesson_length={ele.lesson_length} /> 
                    })}
                </div>
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