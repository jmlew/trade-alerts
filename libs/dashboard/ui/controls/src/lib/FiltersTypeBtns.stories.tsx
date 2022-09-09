import { FiltersType } from '@kdb-dash/dashboard/domain';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FiltersTypeBtns } from './FiltersTypeBtns';

function mockSetType(type: FiltersType) {
  console.log('mockSetType', type);
}

export default {
  title: 'Dash/Controls/FiltersTypeBtns',
  component: FiltersTypeBtns,
  argTypes: {
    onSetType: { action: 'onSetType' },
    type: {
      options: Object.values(FiltersType).filter((x) => typeof x === 'string'),
      mapping: FiltersType,
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof FiltersTypeBtns>;

const Template: ComponentStory<typeof FiltersTypeBtns> = (args) => (
  <FiltersTypeBtns {...args} />
);

export const Main = Template.bind({});
Main.args = {
  onSetType: mockSetType,
};
