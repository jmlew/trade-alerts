import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Loading } from './Loading';

export default {
  title: 'Shared/Common/Loading',
  component: Loading,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Main = Template.bind({});
Main.args = { message: 'Sample Message', top: 10 };
