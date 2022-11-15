describe('Dashboard', () => {
  describe('Data Loading', () => {
    it('should load data and display in dashboard on page load', () => {
      cy.visit(Cypress.env('dash_url'));
    });

    it('should update the url search params with a given alert ID', () => {
      cy.getAriaLabelSel('data filter type options')
        .getAriaLabelSel('by alert id')
        .click();
      const alertId = '1234';
      cy.getAriaLabelSel('alert id').type(alertId);
      cy.url().should('include', `alertid=${alertId}`);
    });

    it('should update the url search params with a given date range', () => {
      const specs = {
        from: {
          label: 'enter date from',
          value: '12 Aug 2022',
          valueMs: '1660226400000',
        },
        to: { label: 'enter date to', value: '10 Sep 2022', valueMs: '1662732000000' },
      };
      cy.getAriaLabelSel('data filter type options')
        .getAriaLabelSel('by date range')
        .click();
      cy.getAriaLabelSel(specs.from.label)
        .find('input')
        .type(`{selectall}${specs.from.value}{enter}`);
      cy.getAriaLabelSel(specs.to.label)
        .find('input')
        .type(`{selectall}${specs.to.value}{enter}`);
      cy.url().should('include', `from=${specs.from.valueMs}`);
      cy.url().should('include', `to=${specs.to.valueMs}`);
    });

    // TODO: Add tests for comparing loaded data with that of server response.
  });

  describe('Alert Manager', () => {
    it('should load an alert into the alert manager window upon clicking a given alert in the overviews panel', () => {
      cy.visit(Cypress.env('dash_url'));
      cy.getAriaLabelSel('alerts overviews').find('button').first().as('firstButton');
      cy.get('@firstButton').then(($btn) => {
        const alertId = $btn.text();
        $btn.trigger('click');
        cy.getAriaLabelSel('manage alerts select').contains(alertId);
      });
    });

    // TODO: Add tests for updating alert status.
  });
});
