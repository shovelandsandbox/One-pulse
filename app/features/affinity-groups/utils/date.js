import moment from "moment";

class DateUtils {
  getTimeSince(dateStr) {
    const date = moment(dateStr);
    const now = moment();
    let diff, result;
    if (now.diff(date, "years") > 0) {
      diff = now.diff(date, "years");
      result = diff + " year";
    } else if (now.diff(date, "months") > 0) {
      diff = now.diff(date, "months");
      result = diff + " month";
    } else if (now.diff(date, "week") > 0) {
      diff = now.diff(date, "week");
      result = diff + " week";
    } else if (now.diff(date, "days") > 0) {
      diff = now.diff(date, "days");
      result = diff + " day";
    } else if (now.diff(date, "hours") > 0) {
      diff = now.diff(date, "hours");
      result = diff + " hour";
    } else {
      diff = now.diff(date, "minutes");
      result = diff + " minute";
    }

    return diff > 1 ? result + "s" : result;
  }
}

export default new DateUtils();
