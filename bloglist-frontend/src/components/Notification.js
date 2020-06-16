import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const message = useSelector(state => state.notification)
    if(!message) {
        return null
    }

    let messageStyle = {
        marginTop: 10
    }

    let variant
    switch(message.styleType){
        case 'success':
            variant = 'success'
            break
        case 'error':
            variant = 'danger'
            break
        default:
            variant = 'secondary'
    }

    return (
        <Alert variant = {variant} style = {messageStyle}>
            {message.message}
        </Alert>
    )
}

export default Notification