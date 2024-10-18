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




export { isCurrentMonth, isDateWithinDays, isDateWithinLastDays };

