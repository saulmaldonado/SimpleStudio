import React from 'react'
import {Link} from 'react-router-dom'

import './NavBarTeacher.css'

export default function NavBarTeacher(){
    return(
        <div>
        <div className='NavBar' >

            <Link to='/teacher'><i className="fas fa-home"></i></Link>
            <Link to='/teacher/lessons'><i className="fas fa-chalkboard-teacher"></i></Link>
            <Link to='/teacher/students'><i className="fas fa-users"></i></Link>
            <Link to='/teacher/logs'><i className="fas fa-drum"></i></Link>
            <Link to='/teacher/payments'><i className="fas fa-money-bill-wave"></i></Link>
            <Link to='/teacher/assignments'><i className="fas fa-book-open"></i></Link>
        </div>

        </div>
    )
}