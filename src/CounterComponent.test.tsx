import React from 'react';
import { render, screen ,fireEvent, getByAltText, getByText } from '@testing-library/react';
import { CounterComponent } from './CounterComponent';
import { text } from 'stream/consumers';

test('CounterComponent', () => {
  // 正しいテキストが表示されているか
  render(<CounterComponent />);
  const count = screen.getByText(/Count: 0/i);
  expect(count).toBeInTheDocument();
  const button = screen.getByText(/Increment/i);
  expect(button).toBeInTheDocument();
});

test('CounterComponentClickEvent',()=>{
  render(<CounterComponent />);
  const countBeforeClick = screen.getByText(/Count: 0/i);
  expect(countBeforeClick).toBeInTheDocument();

  const button = screen.getByText(/Increment/i);
  fireEvent.click(button);

  const countAfterClick = screen.getByText(/Count: 1/i);
  expect(countAfterClick).toBeInTheDocument();
})