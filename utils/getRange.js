// /utils/getRange.js
export function getRange(period) {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === 'today') {
    const end = new Date(startOfDay);
    end.setDate(end.getDate() + 1);
    return { start: startOfDay, end };
  }
  if (period === 'week') {
    const day = startOfDay.getDay(); // 0..6
    const diffToMonday = (day + 6) % 7;
    const start = new Date(startOfDay);
    start.setDate(start.getDate() - diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }
  if (period === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return { start, end };
  }
  // 'year'
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  return { start, end };
}
