import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBarTeacher(){
    return(
        <div>
            <Link to='/teacher'><button>Home</button></Link>
            <Link to='/teacher/lessons'><button>Lessons</button></Link>
            <Link to='/teacher/students'><button>Students</button></Link>
            <Link to='/teacher/logs'><button>Practice Logs</button></Link>
            <Link to='/teacher/payments'><button>Payments</button></Link>
            <Link to='/teacher/assignments'><button>Assignments</button></Link>
        </div>

    )
}