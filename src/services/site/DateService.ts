const isCurrentMonth = (date: Date): boolean => {
  const currentDate = new Date();
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

export { isCurrentMonth };
