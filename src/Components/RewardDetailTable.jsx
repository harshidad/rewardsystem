import React, { useMemo } from 'react';
import { countReward, getMonth } from '../utils';
import  '../Styles/customerRewards.css';
import PropTypes from 'prop-types';

const { objectOf, func, string } = PropTypes;
const RewardDetailTable = ({selectedCustomer, backToCustomerSummary, retailUserData}) =>
{
    const { RetailData } = retailUserData;
    const { Month, UserName} = selectedCustomer;
    const formatDate = (purchaseDate) => {
      const date =  new Date(purchaseDate);
      return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }
  
  const data = useMemo(() => RetailData.filter((fdata) => {
    if(fdata.custName === UserName){
      return getMonth(fdata.purchaseDate) === Month;
    }
  }));
    return(
        <>
        <table class="styled-table">
          <thead>
           <tr>
             <th>Purchase Date</th>
             <th>Amount</th>
             <th>Reward</th>
           </tr>
           </thead>
           <tbody>
           {data.map((val, key) => {
             return (
               <tr key={key}>
                 <td>{formatDate(val.purchaseDate)}</td>
                 <td>{val.Amount}</td>
                 <td>{countReward(val.Amount)}</td>
              </tr>
             )
           })}
           </tbody>
         </table>

         <button onClick={backToCustomerSummary}>Back</button>
  
           </>
       );
}

RewardDetailTable.propTypes = {
  backToCustomerSummary: func.isRequired,
  selectedCustomer: objectOf(func),
  Month: string.isRequired,
  UserName: string.isRequired

}

export default RewardDetailTable;