// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const dbBaseURL = 'http://localhost:3001/api';
const frontBaseUrl = 'http://localhost:3000';
import blogs from '../fixtures/blog.json';



Cypress.Commands.add('login', ({ username, password }) => {
    if(localStorage.getItem('blogUser')){
        localStorage.removeItem('blogUser');
    }
    cy
        .request(
            'POST',
            `${dbBaseURL}/login`,
            { username, password }
        ).then(response => localStorage.setItem('blogUser', JSON.stringify(response.body)));
    // ;

});

Cypress.Commands.add('resetDB', () => {
    cy.request(
        'POST',
        `${dbBaseURL}/testing/reset`,
    );
});

Cypress.Commands.add('addUser', ({ username, password, name }) => {
    cy.request(
        {
            method:  'POST',
            url: `${dbBaseURL}/users`,
            body: { username, name, password },
        }
    );
    cy.visit(frontBaseUrl);
});

Cypress.Commands.add('createBlog', ({ title, url, author }) => {
    cy.request({
        method: 'POST',
        url: `${dbBaseURL}/blogs`,
        body: { title, url, author },
        headers : { Authorization: `bearer ${JSON.parse(localStorage.getItem('blogUser')).token}` }
    });
});

Cypress.Commands.add('goHome', () => {
    cy.visit(frontBaseUrl);
});

Cypress.Commands.add('likeBlog', ({ title }) => {
    cy.contains(title)
        .parent()
        .find('button.detailToggle')
        .then(btn => {
            cy.wrap(btn[0]).click();
            cy.wrap(btn[0]).parent().next().find('button').then(nextBtn => {
                cy.wrap(nextBtn[0]).click();
            });
            cy.wait(2000);
            cy.wrap(btn[0]).click();
        });
});

Cypress.Commands.add('createManyBlogs', () => {
    const objArr = Object.values(blogs);
    for(let i=0; i< objArr.length; i++){
        cy.createBlog(objArr[i]);
    }
});
