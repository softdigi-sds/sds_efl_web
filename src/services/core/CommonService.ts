import moment from "moment";
import moment_timzone from "moment-timezone";
const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};
/**
 *
 * @param dateString
 * @param format
 * @returns
 */
const formatDate = (dateString: string, format: string) => {
  try {
    const formattedDate = moment(dateString).format(format);
    return formattedDate;
  } catch (error) {
    // If an error occurs (e.g., invalid date), return the original string
    return dateString;
  }
};
/**
 *
 * @param title
 * @param lengthDisplay
 * @returns
 */
const displayDots = (title: string, lengthDisplay: number = 25) => {
  return title && title.length > lengthDisplay
    ? `${title.substring(0, 20)}...`
    : title;
};
const displayFiftyDots = (title: string, lengthDisplay: number = 40) => {
  return title && title.length > lengthDisplay
    ? `${title.substring(0, 40)}...`
    : title;
};

const changeDateTimeZone = (
  dateString: string,
  timeZone: string = "Asia/Kolkata"
) => {
  const selectedDateInUTC = moment_timzone.utc(dateString); // Assume the date is already in UTC
  const selectedDateInTimeZone = selectedDateInUTC.tz(timeZone);
  const dateAlone = selectedDateInTimeZone.format("YYYY-MM-DD");
  return dateAlone;
};

const monthNameDisplay = (monthNumber: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber - 1];
};

const getTimeAgo = (timestamp: any) => {
  const currentTime: any = new Date();
  const previousTime: any = new Date(timestamp);
  const timeDifference: any = currentTime - previousTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};

const maskEmail = (email: string) => {
  if (!email) return email;
  const atIndex = email.indexOf("@");
  const prefix = email.substring(0, atIndex);
  const maskedPrefix = prefix.slice(0, Math.max(prefix.length - 3, 0)) + "***";
  return maskedPrefix + email.substring(atIndex);
};

const maskMobileNumber = (number: string) => {
  if (!number || number.length < 5) return number;
  const visibleDigits = 4; // Number of digits to remain visible
  const maskedPart =
    "*".repeat(number.length - visibleDigits) + number.slice(-visibleDigits);
  return maskedPart;
};

const changeDateTimeZoneFormat = (
  dateString: string,
  format: string = "DD-MM-YYYY  HH:MM",
  timeZone: string = "Asia/Kolkata"
) => {
  // Check if the dateString ends with 'Z', if not, add it
  if (dateString && !dateString.endsWith("Z")) {
    //dateString += "Z";
  }
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //console.log("timezone ", userTimezone);
  const selectedDateInUTC = moment_timzone.utc(dateString); // Assume the date is already in UTC
  const selectedDateInTimeZone = selectedDateInUTC.tz("Asia/Kolkata");
  const dateAlone = selectedDateInTimeZone.format(format);
  console.log(
    "date alone",
    dateString,
    "  ouput ",
    dateAlone,
    "utc ",
    selectedDateInUTC,
    " selected one ",
    selectedDateInTimeZone
  );
  return dateAlone;
};
const changeDateFormat = (
  dateString: string,
  format: string = "DD/MM/YYYY",
  timeZone: string = "Asia/Kolkata"
) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const selectedDateInUTC = moment_timzone.utc(dateString); // Assume the date is already in UTC
  const selectedDateInTimeZone = selectedDateInUTC.tz(userTimezone);
  const dateAlone = selectedDateInTimeZone.format(format);
  return dateAlone;
};

const appendCurrentDate = (timeString: string) => {
  // Get the current date
  const now = new Date();

  // Extract the components of the current date
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(now.getDate()).padStart(2, "0");

  // Combine the date and the given time string
  const dateString = `${year}-${month}-${day} ${timeString}`;

  return dateString;
};

const changeDateTimeFormat = (
  timeString: string,
  format: string = "YYYY-MM-DD",
  timeZone: string = "Asia/Kolkata"
) => {
  const dateString = appendCurrentDate(timeString);
  console.log("Date string ", dateString, " time string ", timeString);
  const selectedDateInUTC = moment_timzone.utc(dateString); // Assume the date is already in UTC
  const selectedDateInTimeZone = selectedDateInUTC.tz(timeZone);
  const dateAlone = selectedDateInTimeZone.format(format);
  return dateAlone;
};
const getLocalTime = (time_input: string) => {
  if (time_input.length > 4) {
    const utcDate = new Date(`1970-01-01T${time_input}Z`); // Z indicates UTC
    // Convert to local time
    const localHours = utcDate.getHours();
    const localMinutes = utcDate.getMinutes();
    const localSeconds = utcDate.getSeconds();
    const localTime = `${localHours.toString().padStart(2, "0")}:${localMinutes
      .toString()
      .padStart(2, "0")}`;
    return localTime;
  }
};

export {
  changeDateFormat,
  changeDateTimeFormat,
  changeDateTimeZone,
  changeDateTimeZoneFormat,
  displayDots,
  displayFiftyDots,
  formatDate,
  getTimeAgo,
  isEmptyObject,
  maskEmail,
  maskMobileNumber,
  monthNameDisplay,
  getLocalTime,
};
