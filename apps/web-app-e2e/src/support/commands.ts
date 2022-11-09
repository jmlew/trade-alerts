// Note: type definitions are added to custom cypress.d.ts ("../../types/cypress.d.ts")
// referenced in the tsconfig.

Cypress.Commands.add('getDataCySel', { prevSubject: 'optional' }, (subject, selector) => {
  const source = subject ? cy.wrap(subject) : cy;
  return source.get(`[data-cy="${selector}]"`);
});

Cypress.Commands.add('findDataCySel', { prevSubject: true }, (subject, selector) => {
  return cy.wrap(subject).find(`[data-cy="${selector}]"`);
});

Cypress.Commands.add(
  'getDataCyAttrSel',
  { prevSubject: 'optional' },
  (subject, attr, selector) => {
    const source = subject ? cy.wrap(subject) : cy;
    return source.get(`[data-cy-${attr}="${selector}]"`);
  }
);

Cypress.Commands.add(
  'findDataCyAttrSel',
  { prevSubject: true },
  (subject, attr, selector) => {
    return cy.wrap(subject).find(`[data-cy-${attr}="${selector}]"`);
  }
);

Cypress.Commands.add('getDataCyAttr', { prevSubject: 'optional' }, (subject, attr) => {
  const source = subject ? cy.wrap(subject) : cy;
  return source.get(`[data-cy-${attr}]`);
});

Cypress.Commands.add('findDataCyAttr', { prevSubject: true }, (subject, attr) => {
  return cy.wrap(subject).find(`[data-cy-${attr}]`);
});

Cypress.Commands.add(
  'getDataCyAttrByIndex',
  { prevSubject: 'optional' },
  (subject, attr, index) => {
    const source = subject ? cy.wrap(subject) : cy;
    return source.get(`[data-cy-${attr}]:nth-child(${index})`);
  }
);

Cypress.Commands.add(
  'getAriaLabelSel',
  { prevSubject: 'optional' },
  (subject, selector) => {
    const source = subject ? cy.wrap(subject) : cy;
    return source.get(`[aria-label="${selector}"]`);
  }
);

Cypress.Commands.add('findAriaLabelSel', { prevSubject: true }, (subject, selector) => {
  return cy.wrap(subject).find(`[aria-label="${selector}"]`);
});
