import React from 'react';

const Notification = ({notificationType, notificationMessage}) => {
   if(notificationMessage){
    return (
        <div className={notificationType}>
            {notificationMessage}
        </div>
    );
   }else{
       return null
   }
};

export default Notification;