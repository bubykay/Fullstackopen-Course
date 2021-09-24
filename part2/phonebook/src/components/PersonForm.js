import React from 'react';


import Button from './Button';
import Input from './Input';
import Notification from './Notification';

const PersonForm = ({handleNameChange, handlePhoneChange, newName, newPhone, addPerson, notificationMessage, notificationType}) => {
    return (
        <div>
            <Notification notificationMessage={notificationMessage} notificationType={notificationType} />
            <h2>add new</h2>
            <form onSubmit={addPerson}>
                <Input onChange={handleNameChange} text="name" value={newName} />
                <Input onChange={handlePhoneChange} text="number" value={newPhone} />
                <Button type="submit" text="add" />
            </form>
        </div>
    );
};

export default PersonForm;