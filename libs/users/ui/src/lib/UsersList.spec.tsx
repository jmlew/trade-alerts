import renderer from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';
import { User } from '@trade-alerts/users/domain';

import { UsersList } from './UsersList';

function setup() {
  function onEditUser(userId: number) {
    // default
  }
  function onDeleteUser(userId: number) {
    // default
  }
  const users: User[] = [
    { id: 1, firstName: 'Jason', lastName: 'Lewis', email: 'jason@localhost.com' },
    { id: 2, firstName: 'System', lastName: 'Infra', email: 'system@localhost.com' },
    { id: 3, firstName: 'Administrator', lastName: 'Main', email: 'admin@localhost.com' },
  ];
  return { users, onEditUser, onDeleteUser };
}

describe(UsersList, () => {
  it('should render the component correctly', () => {
    const { users, onEditUser, onDeleteUser } = setup();
    const component = renderer.create(
      <UsersList users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a list item for each user', () => {
    const { users, onEditUser, onDeleteUser } = setup();
    const { getByTestId } = render(
      <UsersList users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
    );
    const length = getByTestId('list').children.length;
    expect(length).toEqual(users.length);
  });
  it('should call edit on edit button click', () => {
    const { users, onDeleteUser } = setup();
    let currentUserId = null;
    function onEditUser(userId: number) {
      currentUserId = userId;
    }
    const { getAllByLabelText } = render(
      <UsersList users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
    );
    const index = 1;
    const user = users[index];
    const btn = getAllByLabelText('edit')[index];
    expect(btn).toBeDefined();
    btn && fireEvent.click(btn);
    expect(currentUserId).toBe(user.id);
  });
  it('should call delete on delete button click', () => {
    const { users, onEditUser } = setup();
    let currentUserId = null;
    function onDeleteUser(userId: number) {
      currentUserId = userId;
    }
    const { getAllByLabelText } = render(
      <UsersList users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
    );
    const index = 1;
    const user = users[index];
    const btn = getAllByLabelText('delete')[index];
    expect(btn).toBeDefined();
    btn && fireEvent.click(btn);
    expect(currentUserId).toBe(user.id);
  });
});
