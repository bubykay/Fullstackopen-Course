
import users from '../fixtures/user.json';
import credentials from '../fixtures/credentials.json';
import blogs from '../fixtures/blog.json';



describe('Blog app', () => {
    beforeEach(function() {
        cy.resetDB();
        cy.wait(300);
        cy.addUser(users.user1);
        cy.goHome();
    });
    it('front page opens',() => {
        cy.contains('Log in');
    });
    it('login button opens loging form',() => {
        cy.contains('Log in').click();
    });
    it('a user can like blog', () => {
        cy.login(users.user1);
        cy.createBlog(blogs.blog1);
        cy.goHome();
        cy.contains('this is a sample Blog')
            .parent()
            .find('button.detailToggle')
            .as('viewButton');
        cy.get('@viewButton').click();

        cy.contains('Likes').parent().find('button.like').as('likeButton');
        cy.contains('0');
        cy.get('@likeButton').click();
        cy.contains('1').should('exist');
    });
    it('blogs are sorted according to likes', () => {
        cy.login(users.user1);
        cy.createManyBlogs();
        cy.goHome();
        cy.likeBlog(blogs.blog1);
        cy.likeBlog(blogs.blog2);
        cy.likeBlog(blogs.blog2);
        cy.likeBlog(blogs.blog6);
        cy.likeBlog(blogs.blog5);
        cy.likeBlog(blogs.blog6);
        cy.likeBlog(blogs.blog6);
    });
});

describe('Login', () => {
    beforeEach(() => {
        cy.resetDB();
        cy.addUser(users.user1);
        cy.goHome();
    });

    it('succeeds with correct credentials',() => {
        cy.contains('Log in').click();
        cy.get('input#username').type(credentials.credential1.username);
        cy.get('input#password').type(credentials.credential1.password);
        cy.get('button#loginButton').click();
        cy.get('button#logoutButton').contains('log out');
    });

    it('fails with wrong credentials',() => {
        cy.contains('Log in').click();
        cy.get('input#username').type(credentials.wrongCredential.username);
        cy.get('input#password').type(credentials.wrongCredential.password);
        cy.get('button#loginButton').click();
        cy.contains('wrong username or password');
    });
});
describe('When logged in', () => {
    beforeEach(() => {
        cy.resetDB();
        cy.addUser(users.user1);
        cy.login(credentials.credential1);
        cy.goHome();
    });
    it('blog form can be opened', () => {
        cy.contains('Create new blog').click();
        cy.get('input#title');
    });
    it('a blog can be created', () => {
        cy.contains('Create new blog').click();
        cy.get('input#title').type(blogs.blog1.title);
        cy.get('input#author').type(blogs.blog1.author);
        cy.get('input#url').type(blogs.blog1.url);
        cy.get('button#Create').click();
    });
});
describe('Delete blog', () => {
    beforeEach(() => {
        cy.wait(2000);
        cy.resetDB();
        cy.addUser(users.user1);
        cy.addUser(users.user2);
        cy.login(users.user1);
        cy.createBlog(blogs.blog1);
        cy.createBlog(blogs.blog2);
        cy.goHome();


    });
    it('user who creates a blog can delete it', () => {

        cy.contains(blogs.blog1.title)
            .parent()
            .find('button.detailToggle')
            .as('viewButton');
        cy.get('@viewButton').click();
        cy.contains(users.user1.name)
            .parent()
            .find('button.deleteBlog')
            .then(btn => {
                cy.wrap(btn[0]).click();
                cy.wait(5100);
            });
        cy.contains('successfully deleted').should('exist');

    });
    it('user who does not create a blog cannot delete it', () => {
        cy.contains(users.user1.name).find('button').as('logoutBtn');
        cy.get('@logoutBtn').click();
        cy.login(users.user2);
        cy.goHome();
        cy.contains(users.user2.name)
            .parent()
            .find('button.deleteBlog').should('not.exist');
    });

});