import { useTable } from 'react-table'
//calculate the reward point based on amount spent by customer
export const countReward = (value) => {
    if(value < 50){
      return 0;
    }
    else if(value >= 50 && value <= 100) {
      return (value - 50) * 1;
    }
    else {
      return ((value - 100) * 2) + 50;
    }
  }
  
  // Get the name of month based on date of purchase.
  export const getMonth = (value) => {
    const date = new Date(value);
    const month= date.toLocaleString("default", { month: "long" }) 
    return month;
  }

  // export const groupBy = (xs, key) => {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };

  export const Table = ({ columns, data }) => {
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