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

import './styles/TeacherCalendar.css'

import 'antd/dist/antd.css'

import { Popover, Button, Modal, DatePicker } from 'antd';



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
            lesson_id: '',
            popup: false,
            editPopup: false

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

    
    parseLessons = () => {
        
        let lessons = this.props.lessons.map((ele, i) => {
            return {title: `${ele.lesson_type} Lesson with ${ele.student_first_name}`, id: ele.lesson_id, start: moment(ele.lesson_time).format(), end: moment(ele.lesson_time).add(ele.lesson_length, 'minutes').format(), lesson_type: ele.lesson_type, lesson_notes: ele.lesson_notes, student_id: ele.student_id }
        })
        
        this.setState({lessons: lessons})
    }
    
    cancelLesson = async(event) => {
            if(window.confirm('Are you sure you want to cancel this lesson?') === true){

                let student_id = this.props.lessons.find(ele => ele.lesson_id === +event.id).student_id


                let newNotification = {
                    notification_type: 'lesson_canceled',
                    notification_title: 'A lesson has been canceled',
                    notification_body: `The ${event.extendedProps.lesson_type} lesson for ${moment(event.start).format('llll')} has been canceled .`,
                    teacher_id: this.props.teacher.teacher_id
                }


                await this.props.CreateNotificationForStudent(student_id, newNotification)

                await this.props.deleteLesson(+event.id)
                await this.updateCalender()



            }
    }
    rescheduleLesson = (date) => {

        let lessons = this.state.lessons.slice()
    
        lessons.find(ele => ele.id === +date.event.id).start = moment(date.event.start)
        lessons.find(ele => ele.id === +date.event.id).end = moment(date.event.end)

        if(window.confirm('Are you sure you want to reschedule?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let prevLessonTime = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).lesson_time
        let lesson_type = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).lesson_type
        let lesson_time = moment(date.event.start)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).lesson_notes
        let student_id = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).student_id


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


    resizeLesson = async(date) => {

        let lessons = this.state.lessons.slice()

        lessons.find(ele => ele.id === +date.event.id).start = moment(date.event.start)
        lessons.find(ele => ele.id === +date.event.id).end = moment(date.event.end)

        if(window.confirm('Are you sure you want to resize lesson length?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let lesson_type = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).lesson_type
        let lesson_time = moment(date.event.start)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).lesson_notes
        let student_id = this.props.lessons.find(ele => ele.lesson_id === +date.event.id).student_id

        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
        }

        let lesson_id = +date.event.id

        await this.props.editLesson(lesson_id, editedLesson)

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
        
        
        await this.props.CreateNotificationForStudent(student_id, newNotification)
        
        
        
        await this.updateCalender()
        
        this.setState({
            lesson_time:'',
            lesson_type:'',
            lesson_length: +lesson_length,
            lesson_notes:'',
            student_id: +student_id,
            popup: false 
        })
    }

    handelInputChange = (e) => {

      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    buttonPressed = ({event, el}) => {
        let content = (
            <div>
                <Popover title={`${event.title}`} trigger='click' content={
                    <div>
                        <p>{event.title} {`${moment(event.start).format('ddd, MMM D h:mm a')} - ${moment(event.end).format('h:mm a')}`}</p>
                            <Button onClick={() => this.editButton(event)} >Edit</Button>
                            <Button onClick={() => this.cancelLesson(event)} >Delete</Button>
                    </div>
                }>
                    <span className="fc-time">{event.title} <br /> {moment(event.start).format('h:mm a')}</span>
                </Popover>
            </div>
          )

          
          
          ReactDOM.render(content, el)

          return el
    }

    rescheduleLessonButton = async() => {
        const { student_id, lesson_type, lesson_time, lesson_length, lesson_notes, lesson_id } = this.state


        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
            lesson_id: +lesson_id,
            student_id: +student_id
        }

        if(window.confirm('Are you sure you want to reschedule this lesson?') === true){

            await this.props.editLesson(lesson_id, editedLesson)
    
            await this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
    
            this.setState({
                lesson_type: '',
                lesson_time: '',
                lesson_length: '',
                lesson_notes: '',
                lesson_id: '',
                student_id: '',
                editPopup: false
            })


        }


        console.log(editedLesson)
        console.log(lesson_id)



    }

    openEditPopup = () => {
        this.setState({
            editPopup: true
        })
    }

    closeEditPopup = () => {
        this.setState({
            editPopup: false
        })
    }

    editButton = (event) => {

            console.log(event)
  

        this.setState({
            editPopup: true,
            lesson_time: moment(event.start),
            lesson_type: event.extendedProps.lesson_type,
            lesson_length: moment.duration(moment(event.end).diff(moment(event.start))).as('minutes'),
            lesson_notes:  event.extendedProps.lesson_notes,
            lesson_id: event.id,
            student_id: event.extendedProps.student_id
        })
        
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
        const { lesson_length, lesson_type, lesson_notes} = this.state

        return(
            
            <div className='calendar-container'>
                    <Modal
                        title='Edit Lesson'
                        visible={this.state.editPopup}
                        onOk={this.rescheduleLessonButton}
                        onCancel={this.closeEditPopup}
                        >
                            <div className='edit-lesson-modal'>
                                <DatePicker value={moment(this.state.lesson_time)} format="MMM Do, h:mm a" name='lesson_time' showTime={{ format: 'HH:mm', minuteStep: 15, use12Hours:true}} onChange={this.onChange} onOk={this.onOK} />

                                <input type='number' name='lesson_length' step='15' min='15' placeholder='Lesson length in min.' value={lesson_length}  onChange={this.handelInputChange}  />
                                <input name='lesson_type' onChange={this.handelInputChange} placeholder='Lesson Type' value={lesson_type} />
                                <textarea  name='lesson_notes'  onChange={this.handelInputChange} placeholder='Notes' value={lesson_notes} />
                                <button onClick={this.rescheduleLessonButton}>Save Changes</button>
                            </div>
                    </Modal>


                    <Modal
                        title='Schedule New Lesson'
                        visible={this.state.popup}
                        onOk={this.scheduleLesson}
                        onCancel={this.closePopup}
                        
                    >
                        <div className='new-lesson-modal' >
                            <DatePicker value={moment(this.state.lesson_time)} format="MMM Do, h:mm a" name='lesson_time' showTime={{ format: 'HH:mm', minuteStep: 15, use12Hours:true}} onChange={this.onChange} onOk={this.onOK} />
                            <input type='number' name='lesson_length' step='15' min='15' placeholder='Lesson length in minutes' value={this.state.lesson_length || ''} onChange={this.handelInputChange}  />
                            <input name='lesson_type' value={this.state.lesson_type} onChange={this.handelInputChange} placeholder='Lesson Type' />
                            <textarea  name='lesson_notes' value={this.state.lesson_notes} onChange={this.handelInputChange} placeholder='Notes' />
                            <select  name='student_id' onChange={this.handelInputChange}>
                            <option  defaultValue  >Select A Student</option>
                                {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                            </select>

                            <button onClick={this.scheduleLesson}>Schedule Lesson</button>
                        </div>
                    </Modal>
           

                <FullCalendar   defaultView='timeGridWeek' 
                                header={{left: 'prev,next today' , center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay'}} 
                                editable={true} 
                                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} 
                                events={[...this.state.lessons]} 
                                eventDrop={this.rescheduleLesson}
                                eventResize={this.resizeLesson}
                                selectable={true}
                                select={this.selectTimeForNewLesson}
                                eventRender={this.buttonPressed}
                                slotDuration={'00:15'}
                                height={'1'}
                                scrollTime={'07:00:00'}
                                minTime={'05:00:00'}
                                maxTime={'23:00:00'}
                                />
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