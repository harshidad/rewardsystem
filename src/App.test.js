import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

const retailUserData = {
  "RetailData": [
    {
        "custId": 2,
        "custName":"Mike",
        "purchaseDate":"2022-07-20T12:00:00Z",
        "Amount":150
    }
  ]
}

const selectedCustomer = {
  label: "Mike",
  value: "Mike"
}

const selectedRow = jest.fn();

test('renders learn react link', () => {
  render(<App selectedCustomer={selectedCustomer} selectedRow={selectedRow} retailUserData={retailUserData} />);
  const linkElement = screen.getByText(/Welcome to Customer Reward System/i);
  expect(linkElement).toBeInTheDocument();
});
