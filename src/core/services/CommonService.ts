import moment from "moment";
import moment_timzone from "moment-timezone";
const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

const formatDate = (dateString: string, format: string, timeZone = false) => {
  try {
    if (timeZone === true) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const selectedDateInUTC = moment_timzone.utc(dateString);
      const selectedDateInTimeZone = selectedDateInUTC.tz(userTimezone);
      const dateAlone = selectedDateInTimeZone.format(format);
      return dateAlone;
    } else {
      const formattedDate = moment(dateString).format(format);
      return formattedDate;
    }
  } catch (error) {
    // If an error occurs (e.g., invalid date), return the original string
    return dateString;
  }
};

export { isEmptyObject, formatDate };
