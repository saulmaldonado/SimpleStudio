import React from 'react'

export default class TeacherProfile extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>

                <div>
                    <div>Teacher Name: {this.props.teacherName} </div>
                    <div>Teacher Email: {this.props.teacherEmail} </div>
                    <div>Teacher Phone: {this.props.teacherPhone} </div>
                </div>
                <div>
                    <img src='http://www.diversegreen.org/wp-content/uploads/2015/09/photo-not-available-clip-art1.png' alt='default' width='200px' height='200px'></img>
                </div>
            </div>
        )
    }
}