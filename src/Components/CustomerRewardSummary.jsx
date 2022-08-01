import React, { useState } from 'react'
import Customers from './Customers';  
import RewardSummaryTable from './RewardSummaryTable';
import RewardDetailTable from './RewardDetailTable';


function CustomerRewardSummary({retailUserData}) {
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [isSummaryTableVisible, setSummaryTableVisible] = useState(true);
  const [isDetailTableVisible, setDetailTableVisible] = useState(false);
  const [selectedRowInfo, setSelectedRowInfo] = useState();
  const updateCustomerSelection = (cust) => {
    setSelectedCustomer(cust);
  }

  const setSelectedRow = (result) => {
    setSummaryTableVisible(false);
    setDetailTableVisible(true);
    setSelectedRowInfo(result);
  }
  
  const backToCustomerSummary = () => {
  
    setSummaryTableVisible(true);
    setDetailTableVisible(false);
  }

  return(
    <div>
        {isSummaryTableVisible && 
        <>
          <h4>Select Customer</h4>
          <Customers retailUserData={retailUserData} selectedRow={selectedRowInfo} getSelectedCustomer={updateCustomerSelection}></Customers>
          {selectedCustomer && <RewardSummaryTable retailUserData={retailUserData} selectedRow={setSelectedRow} selectedCustomer={selectedCustomer}></RewardSummaryTable>}
          </>
        }
        {isDetailTableVisible && <RewardDetailTable retailUserData={retailUserData} backToCustomerSummary={backToCustomerSummary} selectedCustomer={selectedRowInfo}></RewardDetailTable> }
    </div>
)
  
}


export default CustomerRewardSummary
