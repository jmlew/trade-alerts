describe('Users List', () => {
  const attrListItem = 'data-cy-list-item';
  beforeEach(() => {
    cy.request(Cypress.env('reset_mock_users_url'));
    cy.visit(Cypress.env('users_url'));
    cy.attrSelByIndex(attrListItem, 1).as('firstListItem');
    // cy.fixture('users.json').as('users');
  });

  it('should load users list data', () => {
    cy.get('@firstListItem');
  });

  it('should navigate to edit user', () => {
    cy.get('@firstListItem').invoke('attr', attrListItem).as('userId');
    cy.get('@firstListItem').find('[data-btn-edit]').click();
    cy.get('@userId').then((id) =>
      cy.url().should('include', `${Cypress.env('users_url')}/${id}`)
    );
  });

  it('should delete a user', () => {
    cy.attrSel(attrListItem).then(($items) => {
      cy.get('@firstListItem').find('[data-btn-delete]').click();
      cy.attrSel(attrListItem)
        .its('length')
        .should('equal', $items.length - 1);
    });
  });
});
