import React  from 'react';
import Button from './Button';
// import Input from './Input';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

import 'draft-js/dist/Draft.css';

const BlogForm = ({ createBlog }) => {
    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({
            author:author.value,
            title:title.value,
            url:url.value
        });
    };




    return (
        <div>
            <div className='formDiv'>
                <form onSubmit={addBlog}>
                    <div>
                       Title: <input
                            name='title'
                            value={title.value}
                            onChange={title.onChange}
                            type={title.type}
                        />
                    </div>
                    <div>
                        Author: <input
                            name='Author'
                            value={author.value}
                            onChange={author.onChange}
                            type={author.type}
                        />
                    </div>
                    <div>
                        Url: <input
                            name='url'
                            value={url.value}
                            onChange={url.onChange}
                            type={url.type}
                        />
                    </div>

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