import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import { Message } from '../shared/message';
import { nanoid } from 'nanoid';
describe('testing list messages', () => {
  it('render list message', () => {
    const messages: Message[] = [
      {
        name: 'test',
        message: 'test',
        id: nanoid(),
      },
    ];
    render(<MessageList messageList={messages} />);
    const messageEl = screen.getAllByTestId('message');
    expect(messageEl).toHaveLength(1);
  });

  it('add new message', () => {
    const messages: Message[] = [];
    render(<MessageList messageList={messages} />);
    messages.push({
      name: 'test',
      message: 'test',
      id: nanoid(),
    });
    render(<MessageList messageList={messages} />);
    const messagesEl = screen.getAllByTestId('message');
    expect(messagesEl).toHaveLength(1);
  });
});
