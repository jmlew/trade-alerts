import { mount } from 'cypress/react';
import { MemoryRouter } from 'react-router-dom';

// Cypress.Commands.add('mount', mount);
Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;
  return mount(wrapped, mountOptions);
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
