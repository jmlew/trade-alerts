import { MountOptions, MountReturn } from 'cypress/react';
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
