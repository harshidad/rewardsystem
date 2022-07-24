
import React, { useMemo } from 'react';
import { countReward, getMonth, Table } from './utils';
import jsonData from './retailData'
import { Styles } from './Styled';


function CustomerMonthlyRewardDetail(props) {
  const { seletedUserInfo, backToCustomerSummary } = props;

  const { Month, UserName} = seletedUserInfo;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Detail',
        columns: [
          {
            Header: 'Purchase Date',
            accessor: 'purchaseDate',
          },
          {
            Header: 'Purshase Store',
            accessor: 'PurchaseAt',
          },
          {
            Header: 'Amount',
            accessor: 'Amount',
          },
          {
            Header: 'Reward',
            accessor: '',
            Cell: ({row}) => (<div>{countReward(row.original.Amount)}</div> )
          }
        ],
        
      },
    ],
    []
  )
  
  const data = useMemo(() => jsonData.RetailData.filter((fdata) => {
    if(fdata.custName === UserName){
      return getMonth(fdata.purchaseDate) === Month;
    }
  }));
  const totalReward = data.reduce((rec, val) => {
    return rec += val.Amount;
  },0);
  return (
    <>
    <div>
      <h3 style={{textAlign:"left", margin: '15px'}}>Hey {UserName},</h3>
      <Styles>
        <Table  columns={columns} data={data} />
      </Styles>
      <div style={{textAlign:"left", margin: '15px'}}>Total Spent Amount is : {totalReward}</div>
      <div style={{textAlign:"left", margin: '15px'}}>
        <input type="button" value="Back" title="Back" onClick={backToCustomerSummary} />
        </div>
    </div>
    </>
  )
}

export default CustomerMonthlyRewardDetail
