import React from 'react';
import { Input } from './Input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const Template = (args) => <Input {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  fontSize: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  fontSize: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  fontSize: 'medium',
};
