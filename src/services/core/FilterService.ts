
const numberCheck=(currentValue:any, filterValue:any, condition:string)=>{
     let value = parseFloat(currentValue);
     let filter_value = parseFloat(filterValue)
     if(condition==="min"){
        return value >  filter_value;
     }else if(condition==="max"){
        return value <  filter_value;
     }else{
        return value===filter_value;
     }
}

const isValidAndGreaterThanMinDate = (dateString:string, minDateString:string)=> {
    const currentDate = new Date(dateString);
    const minDate = new Date(minDateString);  
    // Check if the given date is a valid date
    if (isNaN(currentDate.getTime())) {
      return false;
    }  
    // Check if the given date is greater than the minimum date
    return currentDate > minDate;
  }

const dateCheck=(currentValue:any, filterValue:any, condition:string)=>{  
    if(condition==="min"){
       return isValidAndGreaterThanMinDate(currentValue,filterValue);
    }else if(condition==="max"){
       return isValidAndGreaterThanMinDate(filterValue,currentValue)
    }else{
       return currentValue===filterValue;
    }
}

const stringCheck=(currentValue:any, filterValue:any, condition:string)=>{  
    if(condition==="equals"){
       return currentValue===filterValue;
    }else{
       return currentValue.includes(filterValue)
    }
}

const filterSingleObject=(obj:any,filterConfigs:any[])=>{
    let matchFound = true;
    for(let i=0;i<filterConfigs.length;i++){
        const { index, value, type,condition } = filterConfigs[i];
        const objValue = obj[index]!==undefined ? obj[index] : null;
        if(!value){
            matchFound = true;
            break;
        }
        // omiting null values from filter
        if(matchFound && !objValue) {
            matchFound = false;
        }
        switch(type){
            case "number" : 
                matchFound = matchFound && numberCheck(objValue,value,condition);
                break;
            case "date" : 
                matchFound = matchFound && dateCheck(objValue,value,condition);
                break;
            default :
                // string comparision
                matchFound = matchFound && stringCheck(objValue,value,condition)
                break;
        }
    }
    return matchFound;
}


const filterArrayOfObject=(data:any,filterConfigs:any[])=>{
    if (!Array.isArray(data) || !Array.isArray(filterConfigs)) {
        // Handle invalid input
        return [];
    }
    return data.filter(item => {
        return filterSingleObject(item,filterConfigs);
    })
}

const filterDate = (item: any, date_index: string, start_date: any, end_date: any) => {
    const parseDateOnly = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const date_item = item[date_index] !== undefined && item[date_index] ? parseDateOnly(new Date(item[date_index])) : null;
    if (!date_item) return true;
    const start_dt = start_date ? parseDateOnly(new Date(start_date)) : null;
    const end_dt = end_date ? parseDateOnly(new Date(end_date)) : null;
    //console.log("dt " , date_item , " sdt " , start_dt , " edt " , end_dt);
    let output = true;
    if (output && start_dt && date_item < start_dt) {
        output = false;
    }
    if (output && end_dt && date_item > end_dt) {      
        output = false;
    }
    return output;
}

const filterIncludes =(item:any, indexs:string[],searchString:string)=>{
     if(searchString && searchString.length < 1 ) return true;
     for(let i=0;i<indexs.length;i++){
        let actual_value = item[indexs[i]]!==undefined ? item[indexs[i]] : null;
        if(actual_value && actual_value?.toLowerCase()?.includes(searchString?.toLowerCase())){
            return true;
        }
     }
     return false;    
}


const sumOfArrayObjectsWithIndex =(item:any[], index:string)=>{
    if(item && item.length < 1 ) return 0;
    
    return false;    
}




export {
    filterArrayOfObject,
    filterDate,
    filterIncludes,
    sumOfArrayObjectsWithIndex
};

