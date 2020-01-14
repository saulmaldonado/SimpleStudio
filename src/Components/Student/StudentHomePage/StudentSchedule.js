import React from 'react'
import LessonBlock from '../../LogBlock/LogBlock'

export default class StudentSchedule extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentSchedule</div>
                <LessonBlock />
            </div>
        )
    }
}