export function timestamp(postDate:Date) {
    const currentDate = new Date();

    let seconds = Math.floor( (currentDate.getTime() - postDate.getTime()) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return postDate.toDateString().slice(4);
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + (Math.floor(interval) > 1 ? " MONTHS" : " MONTH");
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + (Math.floor(interval) > 1 ? " DAYS" : " DAY");
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + (Math.floor(interval) > 1 ? " HOURS" : " HOUR");
    }

    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + (Math.floor(interval) > 1 ? " MINUTES" : " MINUTE");
    }
    return Math.floor(seconds) + (Math.floor(interval) > 1 ? " SECONDS" : " SECOND");
}