describe('Users List', () => {
  const attrListItem = 'data-cy-list-item';
  beforeEach(() => {
    cy.request(Cypress.env('reset_mock_users_url'));
    cy.visit(Cypress.env('users_url'));
  });

  it('should load users list data', () => {
    const index = 1;
    cy.attrByIndex(attrListItem, index);
  });

  it('should navigate to edit user', () => {
    const index = 1;
    cy.attrByIndex(attrListItem, index).invoke('attr', attrListItem).as('userId');
    cy.attrByIndex(attrListItem, index).find('[data-btn-edit]').click();
    cy.get('@userId').then((id) =>
      cy.url().should('include', `${Cypress.env('users_url')}/${id}`)
    );
  });

  it('should delete a user', () => {
    const index = 1;
    const attrSel = `[${attrListItem}]`;
    cy.get(attrSel).its('length').as('itemsLength');
    cy.attrByIndex(attrListItem, index).find('[data-btn-delete]').click();
    cy.get('@itemsLength').then((itemsLength) => {
      cy.get(attrSel)
        .its('length')
        .should('equal', Number(itemsLength) - 1);
    });
  });
});
