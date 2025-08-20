// /utils/birthdays.js
import { parseISO } from 'date-fns';

export const getAge = (birthDateStr) => {
  const birth = parseISO(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export const monthDay = (dateStr) => {
  const d = parseISO(dateStr);
  return { m: d.getMonth(), d: d.getDate() };
};
s