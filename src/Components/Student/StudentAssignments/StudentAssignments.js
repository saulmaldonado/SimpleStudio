import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarStudent from '../../NavBar/NavBarStudent'

export default class StudentAssignments extends React.Component{
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
                <div>StudentAssignments</div>
                
            </div>
        )
    }
}