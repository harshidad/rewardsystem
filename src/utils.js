
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

  