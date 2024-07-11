export function getStatusClass(publishedAt: string): string {
  if (isOlderThanSixMonths(publishedAt)) {
    return 'older-than-six-months';
  } else if (isBetweenOneAndSixMonths(publishedAt)) {
    return 'between-one-and-six-months';
  } else if (isBetweenSevenDaysAndOneMonth(publishedAt)) {
    return 'between-seven-days-and-one-month';
  } else if (isNewerThanSevenDays(publishedAt)) {
    return 'newer-than-seven-days';
  } else {
    return 'unknown-status';
  }
}

function isOlderThanSixMonths(publishedAt: string): boolean {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  return new Date(publishedAt) <= sixMonthsAgo;
}

function isBetweenOneAndSixMonths(publishedAt: string): boolean {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo.setHours(0, 0, 0, 0);

  return (
    new Date(publishedAt) > sixMonthsAgo && new Date(publishedAt) <= oneMonthAgo
  );
}

function isBetweenSevenDaysAndOneMonth(publishedAt: string): boolean {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  return (
    new Date(publishedAt) > oneMonthAgo && new Date(publishedAt) <= sevenDaysAgo
  );
}

function isNewerThanSevenDays(publishedAt: string): boolean {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  return new Date(publishedAt) > sevenDaysAgo;
}
