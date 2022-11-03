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
    /**
     * Selects elements with attributes named 'data-cy'.
     * @example cy.dataCy('foo') returns element with data-cy="foo".
     */
    dataCySel(selector: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Selects elements with attributes prefixed with 'data-cy'.
     * @example cy.dataCy('foo') returns element with data-cy-foo="foo".
     */
    dataCyLikeSel(selector: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Selects elements with attributes named with a given @param attr.
     * @example cy.attrByIndex('data-cy-foo') returns elements with attributes named
     * includes data-cy-foo.
     */
    attrSel(attr: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Selects element with attributes named with a given @param attr of a given @param
     * index.
     * @example cy.attrByIndex('data-cy-foo', 2) returns the 2nd sibling element with an
     * attribute name which includes data-cy-foo.
     */
    attrSelByIndex(attr: string, index: number): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('dataCySel', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('dataCyLikeSel', (selector) => {
  return cy.get(`[data-cy-*=${selector}]`);
});

Cypress.Commands.add('attrSel', (attr) => {
  return cy.get(`[${attr}]`);
});

Cypress.Commands.add('attrSelByIndex', (attr, index) => {
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
