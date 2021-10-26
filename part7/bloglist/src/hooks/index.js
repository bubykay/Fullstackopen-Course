import { useState } from 'react';
import { EditorState } from 'draft-js';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };
    const reset = () => {
        setValue('');
    };
    return {
        value,
        type,
        onChange,
        reset
    };
};

export const useRichText = () => {
    const [value, setValue] = useState(() => EditorState.createEmpty());

    return{
        value,
        onChange:setValue
    };

};