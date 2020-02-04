import React from 'react'

import './styles/LessonBlock.css'


const moment = require('moment')

export default class LessonBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='lesson-block'>
                    <p> <img style={{height: '30px', width: '30px'}} src={require(`../../instrumentIcons/${this.props.lessonType.toLowerCase()}.png`)} /> <b>{this.props.lessonType} Lesson </b> with <b>{this.props.studentName}</b></p>
                    <p style={{color: 'grey', marginLeft: '35px'}} >{this.props.lessonTime} - {moment(this.props.lessonTime).add(this.props.lessonLength, 'minutes').format('LT')}</p>
            </div>
        )
    }
}