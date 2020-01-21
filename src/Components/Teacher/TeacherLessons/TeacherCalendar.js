import React from 'react'
import {getAllLessonsForTeacher} from '../../../redux/reducers/teacherReducer'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {editLesson, createLesson, deleteLesson} from '../../../redux/reducers/lessonReducer'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import '../../../../node_modules/@fullcalendar/core/main.css'
import'../../../../node_modules/@fullcalendar/daygrid/main.css'
import '../../../../node_modules/@fullcalendar/timegrid/main.css'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

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
            open: false,
            deleteMode: false

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

    updateCalender = () =>{
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.parseLessons()
    }

    toggleToCancel = () => {
        this.setState({
            deleteMode: !this.state.deleteMode
        })
    }

    cancelLesson = (info) => {

        if(this.state.deleteMode){
            if(window.confirm('Are you sure you want to cancel this lesson?') === true){
                this.props.deleteLesson(info.event.id)
                this.updateCalender()
            }
        }


    }
    

    openPopup = () => {
        this.setState({
            open: true
        })
    }
    closePopup = () => {
        this.setState({
            open: false
        })
    }
    selectTime = (info) => {

        this.setState({
            lesson_time: moment(info.start).format(moment.HTML5_FMT.DATETIME_LOCAL),
            lesson_length: moment.duration(moment(info.end).diff(moment(info.start))).as('minutes')
        })

        this.openPopup()

    } 

    parseLessons = () => {
        let lessons = []
        this.props.lessons.map((ele, i) => {
            lessons.push({title: `${ele.lesson_type} Lesson with ${ele.student_first_name}`, id: ele.lesson_id, start: ele.lesson_time, end: moment(ele.lesson_time).add(ele.lesson_length, 'minutes').format(moment.HTML5_FMT.DATETIME_LOCAL)})
        })
        this.setState({lessons: lessons})
    }

    rescheduleLesson = (date) => {

        let lessons = this.state.lessons.slice()
    
        lessons.find(ele => ele.id == date.event.id).start = moment(date.event.start).format(moment.HTML5_FMT.DATETIME_LOCAL)
        lessons.find(ele => ele.id == date.event.id).end = moment(date.event.end).format(moment.HTML5_FMT.DATETIME_LOCAL)

        if(window.confirm('Are you sure you want to reschedule?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let lesson_type = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_type
        let lesson_time = moment(date.event.start).format(moment.HTML5_FMT.DATETIME_LOCAL)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_notes

        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
        }

        let lesson_id = +date.event.id

        this.props.editLesson(lesson_id, editedLesson)

        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)


    }

    resizeLesson = (date) => {
        let lessons = this.state.lessons.slice()

        lessons.find(ele => ele.id == date.event.id).start = moment(date.event.start).format(moment.HTML5_FMT.DATETIME_LOCAL)
        lessons.find(ele => ele.id == date.event.id).end = moment(date.event.end).format(moment.HTML5_FMT.DATETIME_LOCAL)

        if(window.confirm('Are you sure you want to resize lesson length?') === true){
            this.setState({
                lessons: lessons
            })
        } else {
            date.revert()
        }

        let lesson_type = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_type
        let lesson_time = moment(date.event.start).format(moment.HTML5_FMT.DATETIME_LOCAL)
        let lesson_length = moment.duration(moment(date.event.end).diff(moment(date.event.start))).as('minutes')
        let lesson_notes = this.props.lessons.find(ele => ele.lesson_id == date.event.id).lesson_notes

        let editedLesson = {
            lesson_type,
            lesson_time,
            lesson_length,
            lesson_notes,
        }

        let lesson_id = +date.event.id

        console.log(editedLesson)

        this.props.editLesson(lesson_id, editedLesson)

        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)


    }

    scheduleLesson = () => {
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

        this.props.createLesson(newLesson)
        
        
        this.setState({
            lesson_time:'',
            lesson_type:'',
            lesson_length: +lesson_length,
            lesson_notes:'',
            student_id: +student_id,
            open: false 
        })

        console.log(this.props.lessons)
        this.updateCalender()
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }
    


    render(){

        console.log(this.props)
        console.log(this.state)

        return(
            <div>
                <div>TeacherCalendar</div>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closePopup}
                >
                    <div>
                        <input type='datetime-local' name='lesson_time' value={this.state.lesson_time || ''} onChange={this.handelInputChange} />
                        <input type='number' name='lesson_length' value={this.state.lesson_length || ''} onChange={this.handelInputChange}  />
                        <input name='lesson_type' value={this.state.lesson_type} onChange={this.handelInputChange} placeholder='Lesson Type' />
                        <textarea  name='lesson_notes' value={this.state.lesson_notes} onChange={this.handelInputChange} placeholder='Notes' />
                        <select  name='student_id' onChange={this.handelInputChange}>
                        <option>Select A Student</option>
                            {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                        </select>

                        <button onClick={this.scheduleLesson}>Schedule Lesson</button>
                    </div>
                </Popup>
                <FullCalendar   defaultView='dayGridMonth' 
                                header={{left: 'prev,next today' , center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay'}} 
                                editable={true} 
                                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} 
                                events={[...this.state.lessons]} 
                                eventRender={  function(info){if(info.view.type === 'dayGridMonth'){tippy(info.el, {content: `${info.event.title}, ${moment(info.event.start).format('LT')}, ${moment.duration(moment(info.event.end).diff(moment(info.event.start))).as('minutes')} minutes ` })}}} 
                                eventDrop={this.rescheduleLesson}
                                eventResize={this.resizeLesson}
                                selectable={true}
                                select={this.selectTime}
                                eventClick={this.cancelLesson}
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


export default connect (mapStateToProps, {getAllLessonsForTeacher, editLesson, getStudentsForTeacher, createLesson, deleteLesson})(TeacherCalendar)