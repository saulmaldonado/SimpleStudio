import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

export default function NavBarStudent(){
    return(
        <div>
                <i className="fas fa-angle-double-right"></i>

            <div className='NavBar'>

                <Link to='/student'><i className="fas fa-home"></i></Link>
                <Link to='/student/lessons'><i className="fas fa-chalkboard-teacher"></i></Link>
                <Link to='/student/teacher'><i className="fas fa-user-tie"></i></Link>
                <Link to='/student/logs'><i className="fas fa-drum"></i></Link>
                <Link to='/student/assignments'><i className="fas fa-book-open"></i></Link>
                <Link to='/student/payments'><i className="fas fa-money-bill-wave"></i></Link>
            </div>

        </div>
    )
}