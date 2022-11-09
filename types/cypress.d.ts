import { MountOptions, MountReturn } from 'cypress/react';
import { ReactNode } from 'react';
import { MemoryRouterProps } from 'react-router-dom';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Chainable<MountReturn>;
      /**
       * Selects all elements with attributes named 'data-cy'.
       * @example cy.dataCy('foo') returns elements with data-cy="foo".
       */
      getDataCySel(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects found child element with attributes named 'data-cy'.
       * @example cy.dataCy('foo') returns elements with data-cy="foo".
       */
      findDataCySel(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects all elements with attributes prefixed with 'data-cy' and includes a given
       * @param custom.
       * @example cy.dataCy('bar', 'foo') returns elements with data-cy-bar="foo".
       */
      getDataCyAttrSel(attr: string, selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects found child element with attributes prefixed with 'data-cy' and includes a given
       * @param custom.
       * @example cy.dataCy('bar', 'foo') returns element with data-cy-bar="foo".
       */
      findDataCyAttrSel(attr: string, selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects all elements with attributes named with a given @param attr.
       * @example cy.attrByIndex('foo') returns elements with attributes named
       * includes data-cy-foo.
       */
      getDataCyAttr(attr: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects found child element with attributes named with a given @param attr.
       * @example cy.attrByIndex('foo') returns element with attributes named
       * includes data-cy-foo.
       */
      findDataCyAttr(attr: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects element with attributes named with a given @param attr of a given @param
       * index.
       * @example cy.attrByIndex('foo', 2) returns the 2nd sibling element with an
       * attribute name which includes data-cy-foo.
       */
      getDataCyAttrByIndex(attr: string, index: number): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects all elements with 'aria-label' attributes set to a given selector.
       * @example cy.ariaLabelSel('foo') returns elements with aria-label="foo".
       */
      getAriaLabelSel(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Selects found child elements with 'aria-label' attributes set to a given selector.
       * @example cy.ariaLabelSel('foo') returns element with aria-label="foo".
       */
      findAriaLabelSel(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
