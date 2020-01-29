import React from 'react'
import { Link } from 'react-router-dom'

import './styles/StudentBlock.css'

export default function StudentBlock(props){
    return(
        <div className='student-block-assignments' >
            <Link to={`/teacher/assignments/${props.studentId}`} ><div> {props.studentName} </div></Link>

        </div>
    )
}