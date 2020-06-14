import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notification)
    if(!message) {
        return null
    }

    let messageStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    switch(message.styleType){
        case 'success':
            messageStyle.color = 'green'
            break
        case 'error':
            messageStyle.color = 'red'
            break
        default:
            messageStyle.color = 'green'
    }

    return (
        <div className = 'message' style = {messageStyle}>
            {message.message}
        </div>
    )
}

export default Notification