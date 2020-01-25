import React from 'react'
import { connect } from 'react-redux'
import {getAllLessons} from '../../../redux/reducers/studentReducer'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../../../../node_modules/@fullcalendar/core/main.css'
import'../../../../node_modules/@fullcalendar/daygrid/main.css'
import '../../../../node_modules/@fullcalendar/timegrid/main.css'


var moment = require('moment')



class StudentCalendar extends React.Component{
    constructor(){
        super()
        this.state={
            lessons: []
        }
    }

    componentDidMount(){
        this.props.getAllLessons(this.props.student.student_id)
        this.parseLessons()
    }

    componentDidUpdate(prevProps){
        if(prevProps.lessons.length !== this.props.lessons.length){
            this.props.getAllLessons(this.props.student.student_id)
            this.parseLessons()
        }
    }

    updateCalender = () =>{
        this.props.getAllLessons(this.props.student.student_id)
        this.parseLessons()
    }



    parseLessons = () => {
        let lessons = []
        this.props.lessons.map((ele, i) => {
          return lessons.push({title: `${ele.lesson_type} Lesson`, id: ele.lesson_id, start: ele.lesson_time, end: moment(ele.lesson_time).add(ele.lesson_length, 'minutes').format(moment.HTML5_FMT.DATETIME_LOCAL)})
        })
        this.setState({lessons: lessons})
    }


    render(){
        return(
            <div>
                <div>StudentCalendar</div>
                <FullCalendar   defaultView='timeGridWeek' 
                                header={{left: 'prev,next today' , center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay'}} 
                                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} 
                                events={[...this.state.lessons]} 
                                />
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        lessons: reduxState.studentReducer.lessons,
        student: reduxState.studentAuthReducer
    }
}

export default connect (mapStateToProps, {getAllLessons})(StudentCalendar)