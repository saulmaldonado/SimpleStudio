import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBarStudent(){
    return(
        <div>
            <Link to='/student'><button>Home</button></Link>
            <Link to='/student/lessons'><button>Lessons</button></Link>
            <Link to='/student/teacher'><button>Teacher</button></Link>
            <Link to='/student/logs'><button>Practice Logs</button></Link>
            <Link to='/student/payments'><button>Payments</button></Link>
            <Link to='/student/assignments'><button>Assignments</button></Link>
        </div>
    )
}