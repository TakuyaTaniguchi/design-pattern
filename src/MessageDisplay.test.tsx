import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageDisplay from './util/MessageDisplay';

test('MessageDisplay shows the message', () => {
  render(<MessageDisplay message='hello' />);
  const textElement = screen.getByText(/^hello$/);
  expect(textElement).toBeInTheDocument();
});