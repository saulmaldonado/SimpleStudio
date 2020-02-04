import React from 'react'

import './styles/LogBlock.css'

const moment = require('moment')

export default class LogBlock extends React.Component{
    render(){
        return(
            <div className='log-block'>
                <div>
                    <p>Practice Log #{this.props.logCount}:</p>
                    <p> Due:<br/><b> {moment(this.props.logDate).format('llll')} </b> </p>
                </div>
                <div  className='log-block-data'>
                    <p> Practiced for <b>{this.props.logTime}</b> minutes </p>
                    <p> What I practiced:<br/><b> {this.props.logData}</b> </p>
                </div>

            </div>
        )
    }
}