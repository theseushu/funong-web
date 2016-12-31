import moment from 'moment';

export const availablePeriods = () => {
  const now = moment();
  const date = now.date();
  const monthNumber = date > 10 ? 13 : 12;

  const start = now.clone().startOf('month');

  // get all the periods to be displayed
  const periods = [];
  for (let i = 0; i < monthNumber; i += 1) {
    const firstInMonth = start.clone().add(i, 'M');
    [0, 1, 2].forEach((j) => {
      const period = firstInMonth.clone().add(10 * j, 'd');
      periods.push(period);
    });
  }

  // set unselectable period to null
  if (date > 10 && date < 21) {
    periods[0] = null;
    periods[periods.length - 1] = null;
  } else if (date >= 21) {
    periods[0] = null;
    periods[1] = null;
  }

  // group those periods and put them in tree structure
  const result = {};
  for (let i = 0; i < periods.length - 1; i += 1) {
    const periodStart = periods[i];
    if (periodStart != null) {
      const periodEnd = periods[i + 1];
      const year = periodStart.year();
      const month = periodStart.month();
      if (!result[year]) {
        result[year] = {};
      }
      if (!result[year][month]) {
        result[year][month] = { name: `${month + 1}月` };
      }
      switch (periodStart.date()) {
        case 1:
          result[year][month].first = { name: '上旬', start: periodStart.valueOf(), end: periodEnd.valueOf() - 1000, year, month };
          break;
        case 11:
          result[year][month].second = {
            name: '中旬',
            start: periodStart.valueOf(),
            end: periodEnd.valueOf() - 1000,
            year,
            month,
          };
          break;
        case 21:
          result[year][month].third = { name: '下旬', start: periodStart.valueOf(), end: periodEnd.valueOf() - 1000, year, month };
          break;
        default: {
          throw new Error('error period!');
        }
      }
    }
  }
  return result;
};

const converDateToString = (date) => {
  if (date === 1) { // === 1
    return '上旬';
  } else if (date === 11) { // === 1
    return '中旬';
  } else if (date === 21) { // === 1
    return '下旬';
  } else if (date === 10) {
    return '上旬';
  } else if (date === 20) {
    return '中旬';
  }
  return '下旬';
};

export const displayPeriod = (startTimestamp, endTimestap) => {
  const now = moment();
  const start = startTimestamp && moment(startTimestamp);
  const end = endTimestap && moment(endTimestap);
  if (start && !end) {
    return `${start.year()}年${start.month() + 1}月${converDateToString(start.date())}`;
  } else if (!start) {
    return null;
  }
  // start && end
  if (start.year() === end.year()) {
    if (start.year() === now.year()) {
      return `${start.month() + 1}月${converDateToString(start.date(), true)} - ${end.month() + 1}月${converDateToString(end.date())}`;
    }
    return `${start.year()}年${start.month() + 1}月${converDateToString(start.date(), true)} - ${end.month() + 1}月${converDateToString(end.date())}`;
  }
  return `${start.year()}年${start.month() + 1}月${converDateToString(start.date(), true)} - ${end.year()}年${end.month() + 1}月${converDateToString(end.date())}`;
};

export const humanizeTime = (timestamp) => {
  const now = moment().valueOf();
  const duration = moment.duration(now - timestamp);
  if (duration.years() > 0) {
    return `${duration.years()}年前`;
  } else if (duration.months() > 0) {
    return `${duration.months()}月前`;
  } else if (duration.weeks() > 0) {
    return `${duration.weeks()}周前`;
  } else if (duration.days() > 0) {
    return `${duration.days()}天前`;
  } else if (duration.hours() > 0) {
    return `${duration.hours()}小时前`;
  }
  return '刚刚';
};
