import React from 'react'

const moment = require('moment')

export default class LogBlock extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <p>Practice Log #{this.props.logCount}:</p>
                    <p>{moment(this.props.logDate).format('llll')}</p>
                </div>
                <div>
                    <p> Practiced for {this.props.logTime} minutes </p>
                    <p> What I practiced: {this.props.logData} </p>
                </div>

            </div>
        )
    }
}