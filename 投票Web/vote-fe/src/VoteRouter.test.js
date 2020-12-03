import { render, screen } from '@testing-library/react';
import VoteRouter from './VoteRouter';

test('renders learn react link', () => {
  render(<VoteRouter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
