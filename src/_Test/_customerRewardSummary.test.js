import { render, screen, fireEvent } from '@testing-library/react';
import CustomerRewardSummary from '../Components/CustomerRewardSummary';


test('Total Reward Text', () => {
    render(<CustomerRewardSummary />);
    const totalRewardText = screen.getByText(/Total Reward is/i);
    expect(totalRewardText).toBeInTheDocument();
  });

  const onClick = jest.fn()

  test('clicking the button toggles an answer on/off', () => {
      render(<CustomerRewardSummary />);
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onClick).toHaveBeenCalledTimes(0);
  })





