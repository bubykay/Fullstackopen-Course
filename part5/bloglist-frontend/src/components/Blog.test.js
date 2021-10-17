import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';
import BlogForm from './BlogForm';
describe('<Blog />', () => {
    let component;
    let updateMockHandler = jest.fn();
    let deleteMockHandler = jest.fn();
    beforeEach(() => {
        const user = {
            username: 'bola',
            token: 'kadnioasdfadsfasd'
        };
        const blog = {
            url: 'www.kayode.com',
            author: 'kayode',
            user: {
                username: 'Kayode',
                name: 'kayode adetayo',
                id: 'iughj0987654rv'
            },
            title: 'blog.title',
            likes: 'blog.likes + 1',
            id: 'blog.id'
        };
        component = render(
            <Blog
                blog={blog}
                user={user}
                update={updateMockHandler}
                deleteBlog={deleteMockHandler}
            />
        );
    });

    test('renders blog', () => {
        expect(component.container).toHaveTextContent('www.kayode.com');
    });
    test('renders only title and author by default', () => {
        const detailDiv = component.container.querySelector('.blogDetail');
        expect(detailDiv).toHaveStyle('display:none');
    });
    test('shows url and number of likes when view button is clicke', () => {
        const button = component.container.querySelector('.detailToggle');
        fireEvent.click(button);
        const detailDiv = component.container.querySelector('.blogDetail');
        expect(detailDiv).not.toHaveStyle('display:none');
    });
    test('event handler is called twice when the like button is clicked twice', () => {
        const likeButton = component.getByText('like');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(updateMockHandler.mock.calls).toHaveLength(2);
    });
});

describe('<BlogForm />', () => {
    let component;
    const handleMockCreateBlog = jest.fn();
    beforeEach(() => {
        component = render(
            <BlogForm createBlog={handleMockCreateBlog} />
        );
    });

    test('calls the event handler it received as props with the right details when a new blog is created', () => {
        const title = component.container.querySelector('#title');
        const author = component.container.querySelector('#author');
        const url = component.container.querySelector('#url');
        const form = component.container.querySelector('form');

        fireEvent.change(title, {
            target: { value:'Learning fullsctack open' }
        });
        fireEvent.change(author, {
            target: { value:'Kayode Adetayo' }
        });
        fireEvent.change(url, {
            target: { value:'kayodeadetayo.com' }
        });
        fireEvent.submit(form);
        expect(handleMockCreateBlog.mock.calls).toHaveLength(1);
        expect(handleMockCreateBlog.mock.calls[0][0].author).toBe('Kayode Adetayo');

    });

});