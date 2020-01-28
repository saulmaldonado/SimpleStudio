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
                    <div>Teacher Name: {this.props.teacherName} </div>
                    <div>Teacher Email: {this.props.teacherEmail} </div>
                    <div>Teacher Phone: {this.props.teacherPhone} </div>
                </div>
            </div>
        )
    }
}