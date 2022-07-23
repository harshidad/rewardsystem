import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { countReward, getMonth } from './utils';
import jsonData from './retailData'

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


function MonthlyReward(props) {
  const { seletedUserInfo, backToMainPage } = props;
  debugger;
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
        <input type="button" value="Back" title="Back" onClick={backToMainPage} />
        </div>
    </div>
    </>
  )
}

export default MonthlyReward
