type MenuItem = {
  course?: string;
  price?: number | string;
};

export const getAveragesByCourse = (menuItems: MenuItem[]) => {
  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};

  menuItems.forEach((item) => {
    const course = item.course?.trim();
    const price = typeof item.price === "string"
      ? parseFloat(item.price)
      : item.price;

    if (!course || price === undefined || isNaN(price)) return;

    if (!totals[course]) {
      totals[course] = 0;
      counts[course] = 0;
    }

    totals[course] += price;
    counts[course] += 1;
  });

  const averages: Record<string, number> = {};

  Object.keys(totals).forEach((course) => {
    averages[course] = totals[course] / counts[course];
  });

  return averages;
};