import { ComponentMeta, ComponentStory } from '@storybook/react';
import { User } from '@trade-alerts/users/domain';

import { UsersList } from './UsersList';

const sampleUsers: User[] = [
  {
    id: 1,
    firstName: 'Jason',
    lastName: 'Lewis',
    email: 'jason@localhost.com',
  },
  {
    id: 2,
    firstName: 'System',
    lastName: 'Infra',
    email: 'system@localhost.com',
  },
  {
    id: 3,
    firstName: 'Administrator',
    lastName: 'Main',
    email: 'admin@localhost.com',
  },
];

export default {
  title: 'Users/UsersList',
  component: UsersList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  /* argTypes: {
    onEditUser: { action: 'onEditUser' },
    onDeleteUser: { action: 'onDeleteUser' },
  }, */
} as ComponentMeta<typeof UsersList>;

const Template: ComponentStory<typeof UsersList> = (args) => <UsersList {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  users: sampleUsers,
};
