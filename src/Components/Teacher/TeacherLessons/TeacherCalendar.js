import React from 'react'
import {getAllLessonsForTeacher} from '../../../redux/reducers/teacherReducer'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {editLesson, createLesson, deleteLesson, getLesson} from '../../../redux/reducers/lessonReducer'
import {CreateNotificationForStudent} from '../../../redux/reducers/studentReducer'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../../../../node_modules/@fullcalendar/core/main.css'
import'../../../../node_modules/@fullcalendar/daygrid/main.css'
import '../../../../node_modules/@fullcalendar/timegrid/main.css'
import { connect } from 'react-redux'
import ReactDOM from "react-dom";

import 'antd/dist/antd.css'

import { Popover, Button, Modal, DatePicker, Tooltip } from 'antd';



var moment = require('moment')




class TeacherCalendar extends React.Component{
    constructor(){
        super()
        this.state={
            lessons:[],
            lesson_time:'',
            lesson_type:'',
            lesson_length:'',
            lesson_notes:'',
            student_id: '',
            input: '',
            popup: false

        }
    }

    
    componentDidMount(){
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
        this.parseLessons()
    }

    componentDidUpdate(prevProps){
        if(prevProps.lessons.length !== this.props.lessons.length){
            this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
            this.parseLessons()
        }
    }

    updateCalender = async() =>{
        await this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.parseLessons()
    }

    openPopup = () => {
        this.setState({
            popup: true
        })
    }

    closePopup = () => {
        this.setState({
            popup: false
        })
    }

    cancelLesson = async(info) => {

        if(this.state.deleteMode){
            if(window.confirm('Are you sure you want to cancel this lesson?') === true){
                await this.props.deleteLesson(info.event.id)
                this.updateCalender()
            }
        }
    }

    parseLessons = () => {

        let lessons = this.props.lessons.map((ele, i) => {
            return {title: `${ele.lesson_type} Lesson with ${ele.student_first_name}`, id: ele.lesson_id, start: ele.lesson_time, end: moment(ele.lesson_time).add(ele.lesson_length, 'minutes')}
        })

        this.setState({lessons: lessons})
    }

    rescheduleLesson = (date) => {

        let lessons = this.state.lessons.slice()
    
        lessons.find(ele => ele.id == date.event.id).start = moment(date.event.start)
        lessons.find(ele => ele.id == date.event.id).end = moment(date.event.end)

        if(window.confirm('Are you sure you want to reschedule?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let prevLessonTime = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_time
        let lesson_type = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_type
        let lesson_time = moment(date.event.start)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_notes
        let student_id = this.props.lessons.find(ele => ele.lesson_id == date.event.id).student_id


        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
        }

        let lesson_id = +date.event.id

        this.props.editLesson(lesson_id, editedLesson)

        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)

        let newNotification = {
            notification_type: 'lesson_rescheduled',
            notification_title: 'A lesson has been rescheduled',
            notification_body: `The ${lesson_type} lesson for ${moment(prevLessonTime).format('llll')} has been rescheduled to ${moment(date.event.start).format('llll')} - ${moment(date.event.end).format('LT')} .`,
            teacher_id: this.props.teacher.teacher_id
        }

        this.props.CreateNotificationForStudent(student_id, newNotification)


    }

    resizeLesson = (date) => {
        let lessons = this.state.lessons.slice()

        lessons.find(ele => ele.id == date.event.id).start = moment(date.event.start)
        lessons.find(ele => ele.id == date.event.id).end = moment(date.event.end)

        if(window.confirm('Are you sure you want to resize lesson length?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let lesson_type = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_type
        let lesson_time = moment(date.event.start)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_notes
        let student_id = this.props.lessons.find(ele => ele.lesson_id == date.event.id).student_id

        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
        }

        let lesson_id = +date.event.id

        this.props.editLesson(lesson_id, editedLesson)

        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)

        let newNotification = {
            notification_type: 'lesson_resized',
            notification_title: 'A lesson has been rescheduled',
            notification_body: `The ${lesson_type} lesson for ${moment(lesson_time).format('LL')} has been rescheduled to ${moment(date.event.start).format('LT')} - ${moment(date.event.end).format('LT')} .`,
            teacher_id: this.props.teacher.teacher_id
        }

        this.props.CreateNotificationForStudent(student_id, newNotification)


    }

    scheduleLesson = async() => {
        const {
        lesson_time,
        lesson_type,
        lesson_length,
        lesson_notes,
        student_id
        } = this.state

        let newLesson={
            student_id,
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes
        }

        await this.props.createLesson(newLesson)
        
        let newNotification = {
            notification_type: 'lesson_created',
            notification_title: 'A new lesson has been scheduled',
            notification_body: `A new ${lesson_type} lesson has been scheduled for ${moment(lesson_time).format('LL')} from  ${moment(lesson_time).format('LT')} - ${moment(lesson_time).add(lesson_length, 'minutes').format('LT')} .`,
            teacher_id: this.props.teacher.teacher_id
        }
        
        this.setState({
            lesson_time:'',
            lesson_type:'',
            lesson_length: +lesson_length,
            lesson_notes:'',
            student_id: +student_id,
            open: false 
        })


        this.props.CreateNotificationForStudent(student_id, newNotification)

        

        this.updateCalender()
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    buttonPressed = ({event, el}) => {

        const content = (
            <div>
                <Popover title='title' trigger='click' content={
                    <div>
                        <p>{event.title} {moment(event.start).format('ddd, MMM D h:mm a')}</p>
                        <Popover title='Edit lesson' trigger='click' content={
                            <div>
                                <input type='number' name='lesson_length' step='5' placeholder='Lesson length in min.' value={this.state.lesson_length || ''} onChange={this.handelInputChange}  />
                                <input name='lesson_type' value={this.state.lesson_type} onChange={this.handelInputChange} placeholder='Lesson Type' />
                                <textarea  name='lesson_notes' value={this.state.lesson_notes} onChange={this.handelInputChange} placeholder='Notes' />
                            </div>
                        }>
                            <Button>Edit</Button>
                        </Popover>
                        <Popover title='Delete lesson' click='click'>
                            <Button>Delete</Button>
                        </Popover>
                    </div>
                }>
                    <span className="fc-time">{event.title} <br /> {moment(event.start).format('h:mm a')}</span>
                    {/* <span className="fc-title">{event.title}</span> */}
                </Popover>
            </div>
          )

          
          
          ReactDOM.render(content, el)

          return el
    }

    createNewLesson = () => {
        const { student_id, lesson_type, lesson_time, lesson_length, lesson_notes } = this.state

        let newLesson = {
            student_id: +student_id,
            lesson_type: lesson_type,
            lesson_time: lesson_time,
            lesson_length: lesson_length,
            lesson_notes: lesson_notes
        }

        this.props.createLesson(newLesson)

        this.setState({
            lesson_time: '',
            lesson_length:'',
            lesson_type:'',
            lesson_notes:''
        })

        alert('Lesson has been created')


    }

    selectTimeForNewLesson = (date) => {

         this.setState({
            popup: true,
            lesson_time: moment(date.start),
            lesson_length: moment.duration(moment(date.end).diff(moment(date.start))).as('minutes')
        })


    }



     onChange = (date, dateString) => {
         this.setState({
             lesson_time: date
         })
      }





    
    
    
    render(){
        console.log(this.props)
        console.log(this.state)
        const {lesson_time, lesson_length, lesson_type, lesson_notes} = this.state

        return(
            <div>


                    <Modal
                        title='Schedule New Lesson'
                        visible={this.state.popup}
                        onOk={this.closePopup}
                        onCancel={this.closePopup}
                    >
                        <div>
                            <DatePicker value={moment(this.state.lesson_time)} format="MMM Do, h:mm a" name='lesson_time' showTime={{ format: 'HH:mm', minuteStep: 15, use12Hours:true}} onChange={this.onChange} onOk={this.onOK} />
                            <input type='number' name='lesson_length' step='5' placeholder='Lesson length in minutes' value={this.state.lesson_length || ''} onChange={this.handelInputChange}  />
                            <input name='lesson_type' value={this.state.lesson_type} onChange={this.handelInputChange} placeholder='Lesson Type' />
                            <textarea  name='lesson_notes' value={this.state.lesson_notes} onChange={this.handelInputChange} placeholder='Notes' />
                            <select  name='student_id' onChange={this.handelInputChange}>
                            <option  defaultValue  >Select A Student</option>
                                {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                            </select>

                            <button onClick={this.scheduleLesson}>Schedule Lesson</button>
                        </div>
                    </Modal>
           

                <FullCalendar   defaultView='dayGridMonth' 
                                header={{left: 'prev,next today' , center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay'}} 
                                editable={true} 
                                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} 
                                events={[...this.state.lessons]} 
                                eventDrop={this.rescheduleLesson}
                                eventResize={this.resizeLesson}
                                selectable={true}
                                select={this.selectTimeForNewLesson}
                                eventRender={this.buttonPressed}
                                />
                                <button onClick={this.toggleToCancel} >Toggle to Cancel Lesson</button>
            </div>

        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        lessons: reduxState.teacherReducer.lessons,
        students: reduxState.teacherReducer.students
    }
}


export default connect (mapStateToProps, {getAllLessonsForTeacher, getLesson, editLesson, getStudentsForTeacher, createLesson, deleteLesson, CreateNotificationForStudent})(TeacherCalendar)