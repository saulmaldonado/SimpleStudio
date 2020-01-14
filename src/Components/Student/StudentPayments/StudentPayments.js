import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarStudent from '../../NavBar/NavBarStudent'

export default class StudentPayments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <TopBar />
                <NavBarStudent />
                <div>StudentPayments</div>
            </div>
        )
    }
}