import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const { objectOf, func } = PropTypes;

const Customers = ({getSelectedCustomer, selectedRow, retailUserData}) =>
{
  const { RetailData } = retailUserData;
  const customerList = [...new Set(RetailData.map(item => item.custName))];
  const { UserName} = selectedRow || {};
  const customers = customerList.map((user) =>  {
     return { value : user, label: user };
    });
  const [selectedcustomer, setSelectedCustomer] = useState(UserName !== undefined && UserName.length > 0 ? { value : UserName, label: UserName }  : customers[0]);

  useEffect(() => {
    getSelectedCustomer(selectedcustomer);
  },[selectedcustomer]);

  const onCustomerChangeHandler = (selectedOption) => {
       setSelectedCustomer(selectedOption);   
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted #009879',
      color: state.isSelected ? '#009879' : 'black',
      backgroundColor: '#FFF',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 250,
      display: 'flex',
      border: '1px solid #009879'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }
    return(
        <>
        <Select styles={customStyles} options={customers}  defaultValue={selectedcustomer} onChange={onCustomerChangeHandler}/>
        </>
        );


}

Customers.propTypes = {
  getSelectedCustomer: func.isRequired,
  selectedRow: objectOf(func)

}

export default Customers;