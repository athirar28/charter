import { render, screen } from '@testing-library/react';
import Transactions from "./transactions"
import { transactionData } from './data';

test('renders learn transaction component', () => {
  render(<Transactions />);
  const linkElement = screen.getByText(/Transactions/i);
  expect(linkElement).toBeInTheDocument();
});

test('change input', () => {
  render(<Transactions />);
  const dateField = screen.getByPlaceholderText('date');
  expect(dateField).toBeInTheDocument();
  dateField.value = '2024-07-18';
  expect(dateField.value).toBe('2024-07-18');
});

test('calculate todate', () => {
  test('fetches transaction data on component mount', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(transactionData) }));
    global.fetch = mockFetch;

    render(<Transactions />);

    // Wait for the component to finish rendering
    await screen.findByText(/Transactions/i);

    // Check if the fetch function was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/transactions');

    // Check if the transaction data is displayed correctly
    const transactionElements = screen.getAllByTestId('transaction');
    expect(transactionElements).toHaveLength(transactionData.length);
  });
}); 



