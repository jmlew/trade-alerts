// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    dataCy(attrValue: string): Chainable<JQuery<HTMLElement>>;
    dataCyLike(attrValue: string): Chainable<JQuery<HTMLElement>>;
    attrByIndex(attr: string, index: number): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('dataCy', (attrValue) => {
  return cy.get(`[data-cy=${attrValue}]`);
});

Cypress.Commands.add('dataCyLike', (attrValue) => {
  return cy.get(`[data-cy-*=${attrValue}]`);
});

Cypress.Commands.add('attrByIndex', (attr, index) => {
  return cy.get(`[${attr}]:nth-child(${index})`);
});

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
