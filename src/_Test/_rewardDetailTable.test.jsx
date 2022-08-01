import { render, screen, fireEvent } from '@testing-library/react';
import RewardDetailTable from '../Components/RewardDetailTable';

const retailUserData = {
    RetailData: [
      {
          custId: 2,
          custName:"Mike",
          purchaseDate:"2022-07-20T12:00:00Z",
          Amoun:150
      }
    ]
  };


const selectedCustomer = {
    label: "Mike",
    value: "Mike"
  }

const selectedRow = jest.fn();

test('Total Reward Text', () => {
    const { getByText } = render(<RewardDetailTable selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
    getByText("Purchase Date"); // queries inside baseElement (which usually means document.body)
    screen.getByText("Purchase Date"); // queries inside document.body
  });

  test('clicking the button toggles an answer on/off', () => {
    const { getByText } = render(<RewardDetailTable selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
    const button = screen.getByRole('button')
    fireEvent.click(button)
    getByText("Back"); // queries inside baseElement (which usually means document.body)
    screen.getByText("Back"); // queries inside document.body
  })



