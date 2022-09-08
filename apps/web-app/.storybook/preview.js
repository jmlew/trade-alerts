import { addDecorator } from '@storybook/react';

import { PaddedDecorator, StylesDecorator } from './decorators';

addDecorator(StylesDecorator);
addDecorator(PaddedDecorator);
