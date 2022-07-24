import React, { useMemo, useState } from 'react'
import jsonData from './retailData'
import CustomerMonthlyRewardDetail from './CustomerMonthlyRewardDetail';
import { countReward, getMonth, Table } from './utils';
import Select from 'react-select';
import { Styles } from './Styled';

function CustomerRewardSummary() {
  
  const [isMonthlyDetailTable, setMonthlyDetail] = useState(true);
  const [isMonthWiseData, setMonthWiseData] = useState(false);
  const [seletedUserInfo, setSelectedUserInfo] = useState();
  
  
  const customerList = [...new Set(jsonData.RetailData.map(item => item.custName))];

  const customers = customerList.map((user) =>  {
    return { value : user, label: user };
  });

  const [selectedcustomer, setSelectedCustomer] = useState(customers[0]);
  
  const customerMonthlyRewardSummary = () => {
  
    const maxMonth = new Date().getMonth();
    const minMonth = maxMonth - 2;
    
    //filter data for last 3 months 
    const rewardCalculation = jsonData.RetailData.map((data) => {
    
      return {...data, TransactionReward : countReward(data.Amount), TransactionMonth: getMonth(data.purchaseDate)};
    }).filter(fdata => {
      const purchaseMonth = new Date(fdata.purchaseDate).getMonth();
      if(purchaseMonth <= maxMonth && purchaseMonth >= minMonth && selectedcustomer.value === fdata.custName ) {
        return fdata;
      }
    });
    var result = [];

    //total per month reward calculation
    rewardCalculation.reduce(function(res, value) {
      if (!res[value.TransactionMonth]) {
        res[value.TransactionMonth] = {customerName: value.custName ,TransactionMonth: value.TransactionMonth, TransactionReward: 0 };
        result.push(res[value.TransactionMonth])
      }
      res[value.TransactionMonth].TransactionReward += value.TransactionReward;
      return res;
    }, {});
    
    return result;
  }

  const MonthlyDetail = (currentRow) => {
    
    setMonthlyDetail(false);
    setMonthWiseData(true);
    setSelectedUserInfo({
      Month: currentRow.row.original.TransactionMonth,
      UserName : currentRow.row.original.customerName
    });
  };

  const backToCustomerSummary = () => {
    setMonthlyDetail(true);
    setMonthWiseData(false);
  }

  const onCustomerChangeHandler = (selectedOption) => {
    setSelectedCustomer(selectedOption);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Detail',
        columns: [
          {
            Header: 'Customer Name',
            accessor: 'customerName',
          },
          
          {
            Header: 'Month',
            accessor: 'TransactionMonth',
          },
          {
            Header: 'Reward',
            accessor: 'TransactionReward',
          },
          {
            Header: 'Detail',
            accessor: ' ',
            Cell: ({row}) => (<div>
              <button onClick={()=>MonthlyDetail({row})}>Detail</button>
             </div> )
          }
        ],
        
      },
    ],
    []
  )
  
  
  const data = useMemo(() => customerMonthlyRewardSummary());
  
  const totalReward = data.reduce((rec, val) => {
    return rec += val.TransactionReward;
  },0);

  return (
    <>
    {isMonthlyDetailTable &&
    <div style={{textAlign:"left", margin: '15px'}}>
      
      <Select
          options={customers}
          defaultValue={selectedcustomer}
          onChange={onCustomerChangeHandler}
        />
      <Styles>
        <Table  columns={columns} data={data} />
      </Styles>
      <div>Total Reward is : {totalReward}</div>
    </div>
    }
    {isMonthWiseData && seletedUserInfo && <CustomerMonthlyRewardDetail backToCustomerSummary={backToCustomerSummary} seletedUserInfo={seletedUserInfo}/>}

        
    </>
  )
}


export default CustomerRewardSummary
