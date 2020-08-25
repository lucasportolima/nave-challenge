export const getFullDate = date => {
  const fullDate = new Date(date);
  return `${fullDate.getDate()}/${fullDate.getMonth() + 1}/${fullDate.getFullYear()}`
}