import { UsersListContainer } from '../../src/lib/containers/UsersListContainer';

describe('<UsersListContainer>', () => {
  beforeEach(() => {
    //
  });

  it('mounts', () => {
    cy.mount(<UsersListContainer />, {
      routerProps: {
        initialEntries: ['/users'],
      },
    });
  });
});
