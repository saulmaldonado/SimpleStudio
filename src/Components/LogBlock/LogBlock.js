import React from 'react'
import './styles/LogBlock.css'

const moment = require('moment')

export default class LogBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='log-block' > 
                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}} >
                    <img src={require('../../instrumentIcons/log.png')} style={{height: '25px', width: '30px', marginRight: '2px'}} />
                    <p style={{lineHeight: '15px'}} > Student: <b> {this.props.studentName} </b> </p>
                    <p style={{color: 'grey', lineHeight: '15px'}} > {moment(this.props.logDate).format('ddd, MMM DD, h:mm A')} </p>
                </div>
                <div className='log-block-data' >
                    <p style={{lineHeight: '15px'}} > Practiced: <b>{this.props.logData}</b> </p>
                </div>

            </div>
        )
    }
}