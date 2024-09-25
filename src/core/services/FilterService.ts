const numberCheck = (
  currentValue: any,
  filterValue: any,
  condition: string
) => {
  try {
    let value = parseFloat(currentValue);
    let filter_value = parseFloat(filterValue);
    if (condition === "min") {
      return value > filter_value;
    } else if (condition === "max") {
      return value < filter_value;
    } else if (condition === "includes") {
      return ("" + value).toLowerCase().includes(filterValue.toLowerCase());
    } else {
      return value === filter_value;
    }
  } catch (error) {
    return false;
  }
};

const isValidAndGreaterThanMinDate = (
  dateString: string,
  minDateString: string
) => {
  try {
    const currentDate = new Date(dateString);
    const minDate = new Date(minDateString);
    // Check if the given date is a valid date
    if (isNaN(currentDate.getTime())) {
      return false;
    }
    // Check if the given date is greater than the minimum date
    return currentDate > minDate;
  } catch (error) {
    return false;
  }
};

const dateCheck = (currentValue: any, filterValue: any, condition: string) => {
  if (condition === "min") {
    return isValidAndGreaterThanMinDate(currentValue, filterValue);
  } else if (condition === "max") {
    return isValidAndGreaterThanMinDate(filterValue, currentValue);
  } else if (condition === "includes") {
    return ("" + currentValue.toLowerCase()).includes(
      filterValue.toLowerCase()
    );
  } else {
    return currentValue === filterValue;
  }
};

const stringCheck = (
  currentValue: any,
  filterValue: any,
  condition: string
) => {
  try {
    if (condition === "equals") {
      return currentValue.toLowerCase() === filterValue.toLowerCase();
    } else {
      return currentValue.toLowerCase().includes(filterValue.toLowerCase());
    }
  } catch (error) {
    return false;
    // console.log("current value ", currentValue);
  }
};

const filterSingleObject = (obj: any, filterConfigs: any[]) => {
  let matchFound = true;
  for (let i = 0; i < filterConfigs.length; i++) {
    const { index, value, type, condition } = filterConfigs[i];
    const objValue = obj[index] !== undefined ? obj[index] : null;
    if (!value) {
      matchFound = true;
      break;
    }
    // omiting null values from filter
    if (matchFound && !objValue) {
      matchFound = false;
    }
    switch (type) {
      case "number":
      case "NUMBER":
        matchFound = matchFound && numberCheck(objValue, value, condition);
        break;
      case "date":
      case "DATE":
        matchFound = matchFound && dateCheck(objValue, value, condition);
        break;
      default:
        // string comparision
        matchFound = matchFound && stringCheck(objValue, value, condition);
        break;
    }
  }
  return matchFound;
};

const filterSingleObjectSearch = (obj: any, filterConfigs: any[]) => {
  for (let i = 0; i < filterConfigs.length; i++) {
    const { index, value, type, condition } = filterConfigs[i];
    const objValue = obj[index] !== undefined ? obj[index] : null;

    if (!value) {
      continue; // Skip this filter if the value is empty or undefined
    }

    // Omit null values from filter
    if (!objValue) {
      continue; // Skip this filter if the object's value is null or undefined
    }
    let matchFound = false;

    switch (type) {
      case "number":
      case "NUMBER":
        matchFound = numberCheck(objValue, value, condition);
        break;
      case "date":
      case "DATE":
        matchFound = dateCheck(objValue, value, condition);
        break;
      default:
        // console.log(" v = ", objValue, " b =", value, " con ", condition);
        // String comparison
        matchFound = stringCheck(objValue, value, condition);
        break;
    }

    if (matchFound) {
      return true; // Return true as soon as one condition is satisfied
    }
  }

  return false; // Return false if no matches are found
};

const filterArrayOfObject = (data: any, filterConfigs: any[]) => {
  if (!Array.isArray(data) || !Array.isArray(filterConfigs)) {
    return [];
  }
  return data.filter((item) => {
    return filterSingleObject(item, filterConfigs);
  });
};

const filterArrayOfObjectSearch = (data: any, filterConfigs: any[]) => {
  if (!Array.isArray(data) || !Array.isArray(filterConfigs)) {
    return [];
  }
  return data.filter((item) => {
    return filterSingleObjectSearch(item, filterConfigs);
  });
};

const SmartSortData = (data: any[], sortConfig: any) => {
  return data.sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction;
    const dataType = sortConfig.dataType;
    // Convert values based on data type
    const aValue = a[key];
    const bValue = b[key];
    let comparison = 0;
    switch (dataType) {
      case "NUMBER":
        comparison = (aValue as number) - (bValue as number);
        break;
      case "DATE":
        comparison =
          new Date(aValue as string).getTime() -
          new Date(bValue as string).getTime();
        break;
      case "STRING":
        comparison = (aValue as string).localeCompare(bValue as string);
        break;
      default:
        comparison = (aValue as string).localeCompare(bValue as string);
        break;
    }
    return direction === "asc" ? comparison : -comparison;
  });
};

export { SmartSortData, filterArrayOfObject, filterArrayOfObjectSearch };
