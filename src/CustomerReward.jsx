import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'
//import makeData from './retailData'
import jsonData from './retailData'
import MonthlyReward from './MonthlyReward';
import { countReward, getMonth } from './utils';
import Select from 'react-select';


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  
  // Render the UI for your table
  return (
    <table >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



function CustomerReward() {
  const [isMonthlyDetailTable, setMonthlyDetail] = useState(true);
  const [isMonthWiseData, setMonthWiseData] = useState(false);
  const [seletedUserInfo, setSelectedUserInfo] = useState();
  
  const userList = [...new Set(jsonData.RetailData.map(item => item.custName))];
  const myUserList = userList.map((user) =>  {
    return { value : user, label: user };
  });
  const [selecteduserOption, setSelectedUserOption] = useState(myUserList[0]);

  const level1Grid = () => {
    const maxMonth = new Date().getMonth();
    const minMonth = maxMonth - 2;
    
    const updatedArray = jsonData.RetailData.map((data) => {
    //const updatedArray = makeData.RetailData.map((data) => {
      return {...data, TransactionReward : countReward(data.Amount), TransactionMonth: getMonth(data.purchaseDate)};
    }).filter(fdata => {
      const purchaseMonth = new Date(fdata.purchaseDate).getMonth();
      if(purchaseMonth <= maxMonth && purchaseMonth >= minMonth && selecteduserOption.value === fdata.custName ) {
        return fdata;
      }
    });
    var result = [];
    updatedArray.reduce(function(res, value) {
      if (!res[value.TransactionMonth]) {
        res[value.TransactionMonth] = {customerName: value.custName ,TransactionMonth: value.TransactionMonth, TransactionReward: 0 };
        result.push(res[value.TransactionMonth])
      }
      res[value.TransactionMonth].TransactionReward += value.TransactionReward;
      return res;
    }, {});
    //setFilterData(result);
    return result;
  }

  const MonthlyDetail = (currentRow) => {
    debugger;
    setMonthlyDetail(false);
    setMonthWiseData(true);
    setSelectedUserInfo({
      Month: currentRow.row.original.TransactionMonth,
      UserName : currentRow.row.original.customerName
    });
  };

  const backToMainPage = () => {
    setMonthlyDetail(true);
    setMonthWiseData(false);
  }

  const handleChange = (selectedOption) => {
    debugger;
    setSelectedUserOption(selectedOption);
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
  
  const data = useMemo(() => level1Grid());
  const totalReward = data.reduce((rec, val) => {
    return rec += val.TransactionReward;
  },0);

  

  

  return (
    <>
    {isMonthlyDetailTable &&
    <div style={{textAlign:"left", margin: '15px'}}>
      
      <Select
          options={myUserList}
          defaultValue={selecteduserOption}
          onChange={handleChange}
        />
      <Styles>
        <Table  columns={columns} data={data} />
      </Styles>
      <div>Total Reward is : {totalReward}</div>
    </div>
    }
    {isMonthWiseData && seletedUserInfo && <MonthlyReward backToMainPage={backToMainPage} seletedUserInfo={seletedUserInfo}/>}
    </>
  )
}

export default CustomerReward
