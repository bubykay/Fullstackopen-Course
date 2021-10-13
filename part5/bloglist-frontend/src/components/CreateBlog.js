import React from 'react';
import Button from './Button';
import Input from './Input';

const CreateBlog = ({title, setTitle, author, setAuthor, url, setUrl, onSubmit}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input 
                name='title' 
                onChange={({target})=>setTitle(target.value)} 
                type='text'
                value={title}
                />
                <Input 
                name='author' 
                onChange={({target})=>setAuthor(target.value)} 
                type='text'
                value={author}
                />
                <Input 
                name='url' 
                onChange={({target})=>setUrl(target.value)} 
                type='text'
                value={url}
                />
               <Button type='submit' label='Create' />
            </form>
        </div>
    );
};

export default CreateBlog;