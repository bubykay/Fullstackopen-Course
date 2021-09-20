import React from 'react';


import Button from './Button';
import Input from './Input';

const PersonForm = ({handleNameChange, handlePhoneChange, newName, newPhone, addPerson}) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <Input onChange={handleNameChange} text="name" value={newName} />
                <Input onChange={handlePhoneChange} text="number" value={newPhone} />
                <Button type="submit" text="add" />
            </form>
        </div>
    );
};

export default PersonForm;