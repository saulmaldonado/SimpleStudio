import React from 'react'

import StudentSelectorLogs from './StudentSelectorLogs'

export default class TeacherLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherLogs</div>
                <StudentSelectorLogs />
            </div>
        )
    }
}