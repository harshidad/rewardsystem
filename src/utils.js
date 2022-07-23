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
  
  export const getMonth = (value) => {
    /*const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const date = new Date(value);
    const rewardMonth = month[date.getMonth()];
    return rewardMonth;*/
    const date = new Date(value);
    const month= date.toLocaleString("default", { month: "long" }) 
    return month;
  }

  export const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };