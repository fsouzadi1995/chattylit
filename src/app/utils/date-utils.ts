export class DateUtils {
  public static obtainFiveMinutesAgoDate(): Date {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);

    return date;
  }
}
