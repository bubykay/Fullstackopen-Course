import React from 'react';
import { useSelector } from 'react-redux';
// import Alert from '@material-ui/core/';
const Notification = () => {

    const notification = useSelector(state => state.notification);
    if(notification){
        return (
            <div className={notification.type}>
                <p>{notification}</p>
            </div>
        );
    }
    return(null);
};

export default Notification;