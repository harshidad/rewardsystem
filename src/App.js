// import './App.css';
import CustomerRewardSummary from './Components/CustomerRewardSummary';
import { useEffect, useState } from 'react';


function App() {
  const [retailUserData, setRetailUserData] = useState();
  const getData = ()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
         return response.json();
      })
      .then(function(myJson) {
        setRetailUserData(myJson);
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="App">
      <h1>Welcome to Customer Reward System</h1>
      {retailUserData !== undefined && <CustomerRewardSummary retailUserData={retailUserData}/>}
    </div>
  );
}

export default App;
