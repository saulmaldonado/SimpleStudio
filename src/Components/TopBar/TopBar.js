import React from 'react'
import Login from './Login'

export default function TopBar(){
    return(
        <div>
            {/* conditionally render Login based on req.session.user */}
            <Login />
            <div>TopBar</div>
        </div>
    )
}