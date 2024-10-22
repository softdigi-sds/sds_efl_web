const isCurrentMonth = (date: Date): boolean => {
  const currentDate = new Date();
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

const isDateWithinLastDays=(dateToCheck:any,checkDays:number=10)=> {
  const dateCheck = new Date(dateToCheck);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - dateCheck.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days  
  return differenceInDays <= checkDays && differenceInDays >= 0;
}

const isDateWithinDays=(dateToCheck:any,checkDays:number=10)=> {
  const dateCheck = new Date(dateToCheck);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - dateCheck.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days  
  return differenceInDays >= checkDays && differenceInDays >= 0;
}


const getMonthStartAndEnd=(date:string)=> {
  // Create a new date instance based on the provided date
  const givenDate = new Date(date);
  // Get the start date of the month
  const startDate = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
  // Get the end date of the month
  const endDate = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0);
  // Format the dates as strings (e.g., YYYY-MM-DD)
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];
  return { start, end };
}



export { getMonthStartAndEnd, isCurrentMonth, isDateWithinDays, isDateWithinLastDays };

