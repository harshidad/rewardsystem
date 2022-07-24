import { render, screen, fireEvent } from '@testing-library/react';
import CustomerMonthlyRewardDetail from '../Components/CustomerMonthlyRewardDetail';

const seletedUserInfo = {
    Month : 'July',
    UserName : 'Mike'
}

test('Total Reward Text Test', () => {
    render(<CustomerMonthlyRewardDetail seletedUserInfo={seletedUserInfo} />);
    const totalAmountText = screen.getByText(/Total Spent Amount is/i);
    expect(totalAmountText).toBeInTheDocument();
  });

  const onClick = jest.fn()

test('clicking the back button', () => {
    render(<CustomerMonthlyRewardDetail seletedUserInfo={seletedUserInfo} />);
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(onClick).toHaveBeenCalledTimes(0);
})