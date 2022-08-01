import { render, screen, fireEvent } from '@testing-library/react';
import RewardSummaryTable from '../Components/RewardSummaryTable';

const retailUserData = {
  RetailData: [
    {
      custId: 2,
      custName: "Mike",
      purchaseDate: "2022-07-20T12:00:00Z",
      Amoun: 150
    }
  ]
};

const selectedCustomer = {
  label: "Mike",
  value: "Mike"
}

const selectedRow = jest.fn();

test('Reward Summary Table Render', () => {
  const { getByText } = render(<RewardSummaryTable selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
  getByText("Customer Name"); 
  screen.getByText("Customer Name"); 
});

test('clicking the Detail button', () => {
  const { getByText } =  render(<RewardSummaryTable selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
  const button = screen.getByRole('button')
  fireEvent.click(button)
  getByText("Detail"); 
  screen.getByText("Detail"); 
})





