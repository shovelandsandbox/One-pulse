import moment from "moment";

// function to calculate time difference between two dates
export const  getTimeDifference = (dateTime) => {        
    const time =  moment.utc(dateTime,"YYYY-MM-DD HH:mm:ss");
    // get time difference in days
    const diffInDays = moment.utc().diff(time,"days");
    if(diffInDays===0){
        // get time difference in hours
        const diffInHrs = moment.utc().diff(time,"hours");
        if(diffInHrs===0){
            const diffInMinutes = moment.utc().diff(time,"minutes");
            return {value:diffInMinutes, key:"minutes"};
        }
        else {
            return {value:diffInHrs, key:"hours"};
        }
    }
    else{
        return {value: diffInDays, key:"days"};
    }
}