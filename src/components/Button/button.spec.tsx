import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('test button component', () => {
  const addMessage = jest.fn();
  it('render button', () => {
    render(<Button addField={addMessage} disabled={false} />);
  });

  it('calls when clicked', () => {
    const addMessage = jest.fn();
    render(<Button addField={addMessage} disabled={false}></Button>);
    fireEvent.click(screen.getByText(/enter/i));
    expect(addMessage).toHaveBeenCalledTimes(1);
  });
});
