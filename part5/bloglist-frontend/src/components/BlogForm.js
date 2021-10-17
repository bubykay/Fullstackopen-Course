import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({ author,title,url });
    };


    return (
        <div>
            <div className='formDiv'>
                <form onSubmit={addBlog}>
                    <Input
                        name='title'
                        onChange={({ target }) => setTitle(target.value)}
                        type='text'
                        value={title}
                    />
                    <Input
                        name='author'
                        onChange={({ target }) => setAuthor(target.value)}
                        type='text'
                        value={author}

                    />
                    <Input
                        name='url'
                        onChange={({ target }) => setUrl(target.value)}
                        type='text'
                        value={url}

                    />
                    <Button type='submit' label='Create' />
                </form>
            </div>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

export default BlogForm;