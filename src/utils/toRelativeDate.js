import { DateTime } from "luxon";

export const toRelativeDate = (date) => {
  return DateTime.fromISO(date).toFormat(
    "dd 'de' LLL 'del' yyyy 'a las' HH:mm",
    {
      locale: "es",
    },
  );
};
