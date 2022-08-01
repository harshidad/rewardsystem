import { render, screen, fireEvent } from '@testing-library/react';
import CustomerRewardSummary from '../Components/CustomerRewardSummary';

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

  const selectedRow = jest.fn(true);


test('Customer Reward Summary component render', () => {
    const { getByText } = render(<CustomerRewardSummary selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
    getByText("Select Customer"); // queries inside baseElement (which usually means document.body)
    screen.getByText("Select Customer"); // queries inside document.body
  });

  test('Customer Reward Summary component render detail table', () => {
    
    const { getByText } = render(<CustomerRewardSummary isDetailTableVisible={true} selectedRow={selectedRow} selectedCustomer={selectedCustomer} retailUserData={retailUserData} />);
    getByText("Select Customer"); // queries inside baseElement (which usually means document.body)
    screen.getByText("Select Customer"); // queries inside document.body
  });





