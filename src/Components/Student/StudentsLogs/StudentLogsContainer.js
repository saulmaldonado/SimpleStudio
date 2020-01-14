import React from 'react'
import LogBlock from '../../LogBlock/LogBlock'

export default class StudentLogsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentLogsContainer</div>
                <LogBlock />
                <div>Logs Submitted</div>
                <div>minutes practiced</div>
            </div>
        )
    }
}