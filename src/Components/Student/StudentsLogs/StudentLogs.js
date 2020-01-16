import React from 'react'

import NewPracticeLog from './NewPracticeLog'
import EditPracticeLog from './EditPracticeLog'
import StudentLogsContainer from './StudentLogsContainer'

export default class StudentLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>

                <div>
                    <div>
                        <p>StudentLogs</p>
                        <StudentLogsContainer />
                    </div>

                </div>
                <div>
                    <NewPracticeLog />
                    <EditPracticeLog />
                </div>
            </div>
        )
    }
}