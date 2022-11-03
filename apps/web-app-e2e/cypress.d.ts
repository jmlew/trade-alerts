import { mount } from 'cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * Selects elements with attributes named 'data-cy'.
       * @example cy.dataCy('foo') returns element with data-cy="foo".
       */
      dataCySel(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects elements with attributes prefixed with 'data-cy' and includes a given
       * @param custom.
       * @example cy.dataCy('bar', 'foo') returns element with data-cy-bar="foo".
       */
      dataCyAttrSel(attr: string, selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects elements with attributes named with a given @param attr.
       * @example cy.attrByIndex('foo') returns elements with attributes named
       * includes data-cy-foo.
       */
      dataCyAttr(attr: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects element with attributes named with a given @param attr of a given @param
       * index.
       * @example cy.attrByIndex('foo', 2) returns the 2nd sibling element with an
       * attribute name which includes data-cy-foo.
       */
      dataCyAttrByIndex(attr: string, index: number): Chainable<JQuery<HTMLElement>>;
    }
  }
}
