import { waitFor, render, screen, getByRole } from '@testing-library/react';
import App from './App';

test('renders loading page', () => {
  render(<App />);
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
});

test('waits until loading spinner dissapears', async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })
});

test('waits until text appears', async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
  })
});







