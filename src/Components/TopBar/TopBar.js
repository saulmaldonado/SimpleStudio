import React from 'react'
import Login from './Login'
import './styles/TopBar.css'

export default function TopBar(){
    return(
        <div className='TopBar'>
            <div className='title-and-logo' >
                <i className="fas fa-music"></i>
                <h1 className='main-title' >Simple Studio</h1>
            </div>
            <Login />
        </div>
    )
}