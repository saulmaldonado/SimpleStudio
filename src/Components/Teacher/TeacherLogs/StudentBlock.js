import React from 'react'
import { Link } from 'react-router-dom'


export default function StudentBlock(props){
    return(
        <div className='student-block' >
            <Link to={`/teacher/logs/${props.studentId}`} ><div> {props.studentName} </div></Link>
        </div>
    )
}