import React from 'react'

import StudentSchedule from '../StudentHomePage/StudentSchedule'

export default class StudentLessons extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentLessons</div>
                <div>Calendar</div>
                <StudentSchedule />
            </div>
        )
    }
}