import React from 'react'

import NewPracticeLog from './NewPracticeLog'
import EditPracticeLog from './EditPracticeLog'
import StudentLogsContainer from './StudentLogsContainer'
import { Route, Switch } from 'react-router-dom'

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
                    <div>
                    </div>

                </div>
                <div>
                    <Switch>
                        <Route exact path='/student/logs' component={NewPracticeLog}/>
                        <Route path='/student/logs/edit/:id' component={EditPracticeLog} />
                    </Switch>
                </div>
            </div>
        )
    }
}