// Note: type definitions are added to custom cypress.d.ts.

Cypress.Commands.add('dataCySel', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('dataCyAttrSel', (attr, selector) => {
  return cy.get(`[data-cy-${attr}=${selector}]`);
});

Cypress.Commands.add('dataCyAttr', (attr) => {
  return cy.get(`[data-cy-${attr}]`);
});

Cypress.Commands.add('dataCyAttrByIndex', (attr, index) => {
  return cy.get(`[data-cy-${attr}]:nth-child(${index})`);
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
