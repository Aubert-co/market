export const now = new Date();

export const oneWeekFromNow: Date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const oneMonthFromNow: Date = new Date(now);
oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

export const fiveDaysFromNow: Date = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
