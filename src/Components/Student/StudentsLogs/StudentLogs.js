import React from 'react'

import NewPracticeLog from './NewPracticeLog'
import EditPracticeLog from './EditPracticeLog'

export default class StudentLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>

                <div>StudentLogs</div>
                <NewPracticeLog />
                <EditPracticeLog />
            </div>
        )
    }
}