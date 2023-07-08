import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { Input } from './Input';

describe('test input component', () => {
  it('render input', () => {
    const setMessage = jest.fn();
    render(<Input setField={setMessage} />);
  });

  it('change input value', () => {
    const setMessage = jest.fn();
    render(<Input setField={setMessage}></Input>);
    userEvent.type(screen.getByRole('textbox') as HTMLInputElement, 'Alexios');
    expect(screen.getByRole('textbox')['value']).toBe('Alexios');
  });

  it('input change function', () => {
    const setMessage = jest.fn();
    render(<Input setField={setMessage}></Input>);
    userEvent.type(screen.getByRole('textbox') as HTMLInputElement, 'Alexios');
    expect(setMessage).toHaveBeenCalledTimes(7);
  });
});
