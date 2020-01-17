import React from 'react'
import { connect } from 'react-redux'
import { getStudent } from '../../../redux/reducers/teacherReducer'


class StudentProfile extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getStudent(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getStudent(this.props.match.params.id)
        }
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <div>
                    <p>StudentProfile</p>
                </div>
                <div>
                    <img src='http://www.diversegreen.org/wp-content/uploads/2015/09/photo-not-available-clip-art1.png' alt='default' width='200px' height='200px'></img>
                </div>
                <div>
                    <p> {`${this.props.student.first_name} ${this.props.student.last_name}`} </p>
                    <p> {this.props.student.email} </p>
                    <p> {this.props.student.phone} </p>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        student: reduxState.teacherReducer.selectedStudent     
    }
}

export default connect(mapStateToProps, { getStudent })(StudentProfile)