describe('Users List', () => {
  const attrListItem = 'list-item';

  beforeEach(() => {
    cy.request(Cypress.env('reset_mock_users_url'));
    cy.visit(Cypress.env('users_url'));
    cy.getDataCyAttrByIndex(attrListItem, 1).as('firstListItem');
    cy.get('@firstListItem')
      .invoke('attr', `data-cy-${attrListItem}`)
      .as('firstListItemUserId');
  });

  it('should navigate to new user on Add button click', () => {
    cy.getAriaLabelSel('new user').click();
    cy.url().should('include', `${Cypress.env('users_url')}/new`);
  });

  it('should navigate to edit user on edit button click', () => {
    cy.get('@firstListItem').getAriaLabelSel('edit').first().click();
    cy.get('@firstListItemUserId').then((id) =>
      cy.url().should('include', `${Cypress.env('users_url')}/${id}`)
    );
  });

  it('should delete a user on edit button click', () => {
    cy.getDataCyAttr(attrListItem).then(($items) => {
      cy.get('@firstListItem').getAriaLabelSel('delete').first().click();
      // Verify the number of list items has decreased by 1.
      cy.getDataCyAttr(attrListItem)
        .siblings()
        .should('have.length', $items.length - 1);
      // Verify the original list item is gone.
      cy.get('@firstListItemUserId').then((id) => {
        cy.getDataCyAttrSel(attrListItem, String(id)).should('not.exist');
      });
    });
  });
});
