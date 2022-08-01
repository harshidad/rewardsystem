import React, { useMemo } from 'react';
import { countReward, getMonth } from '../utils';
import '../Styles/customerRewards.css';
import PropTypes from 'prop-types';

const { objectOf, func } = PropTypes;

const RewardSummaryTable = ({ selectedCustomer, selectedRow, retailUserData }) => {
  const { RetailData } = retailUserData;
  const customerMonthlyRewardSummary = () => {

    const maxMonth = new Date().getMonth();
    const minMonth = maxMonth - 2;

    //filter data for last 3 months 
    const rewardCalculation = RetailData.map((data) => {

      return { ...data, TransactionReward: countReward(data.Amount), TransactionMonth: getMonth(data.purchaseDate) };
    }).filter(fdata => {
      const purchaseMonth = new Date(fdata.purchaseDate).getMonth();
      if (purchaseMonth <= maxMonth && purchaseMonth >= minMonth && selectedCustomer.value === fdata.custName) {
        return fdata;
      }
    });
    var result = [];

    //total per month reward calculation
    rewardCalculation.reduce(function (res, value) {
      if (!res[value.TransactionMonth]) {
        res[value.TransactionMonth] = { customerName: value.custName, TransactionMonth: value.TransactionMonth, TransactionReward: 0 };
        result.push(res[value.TransactionMonth])
      }
      res[value.TransactionMonth].TransactionReward += value.TransactionReward;
      return res;
    }, {});

    return result;
  }
  const cdata = useMemo(() => selectedCustomer && customerMonthlyRewardSummary());
  const MonthlyDetail = (currentRow) => {

    selectedRow({
      Month: currentRow.val.TransactionMonth,
      UserName: currentRow.val.customerName
    });
  };
  return (
    <>
      <table class="styled-table">
        <thead>
        <tr>
          <th>Customer Name</th>
          <th>Transaction Month</th>
          <th>Reward</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {cdata.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.customerName}</td>
              <td>{val.TransactionMonth}</td>
              <td>{val.TransactionReward}</td>
              <td><button onClick={() => MonthlyDetail({ val })}>Detail</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );

}

RewardSummaryTable.propTypes = {
  selectedCustomer: objectOf(func),
  selectedRow: objectOf(func)

}

export default RewardSummaryTable;
