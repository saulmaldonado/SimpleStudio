import React from 'react'

import './styles/TeacherProfile.css'

export default class TeacherProfile extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='TeacherProfile'>

                <div className='teacher-profile-image'>
                    <img src='http://www.diversegreen.org/wp-content/uploads/2015/09/photo-not-available-clip-art1.png' alt='default' width='200px' height='200px'></img>
                </div>
                <div className='teacher-profile-info'>
                    <div>Teacher Name: <b>{this.props.teacherName}</b> </div>
                    <div>Teacher Email: <b>{this.props.teacherEmail}</b> </div>
                    <div>Teacher Phone: <b>{this.props.teacherPhone}</b> </div>
                </div>
            </div>
        )
    }
}