//Creates the Data to go into the Month in a Month Year format.
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateHolder = new Date();
export const currentYear = dateHolder.getFullYear()
export const currentMonth = monthNames[dateHolder.getMonth()] +" "+ dateHolder.getFullYear();
let holder;

if (dateHolder.getMonth() !== 11) {
  holder =
    monthNames[Number(dateHolder.getMonth() + 1)] +" "+ dateHolder.getFullYear();
} else {
  holder = monthNames[0] +" "+ Number(dateHolder.getFullYear() + 1);
}

export const nextMonth = holder;

export let defaultDropDownMonth;

//Creates Dropdown data for months
export const monthsDropdownData = [
  {
    key: "January",
    text: "January",
    // eslint-disable-next-line
    value: "January" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "February",
    text: "February",
    // eslint-disable-next-line
    value: "February" +" "+ dateHolder.getFullYear(),
  },
  // eslint-disable-next-line
  { key: "March", text: "March", value: "March" +" "+ dateHolder.getFullYear() },
  // eslint-disable-next-line
  { key: "April", text: "April", value: "April" +" "+ dateHolder.getFullYear() },
  // eslint-disable-next-line
  { key: "May", text: "May", value: "May"+" "+ dateHolder.getFullYear() },
  // eslint-disable-next-line
  { key: "June", text: "June", value: "June" +" "+ dateHolder.getFullYear() },
  // eslint-disable-next-line
  { key: "July", text: "July", value: "July" +" "+ dateHolder.getFullYear() },
  // eslint-disable-next-line
  { key: "August", text: "August", value: "August" +" "+ dateHolder.getFullYear() },
  {
    key: "September",
    text: "September",
    // eslint-disable-next-line
    value: "September" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "October",
    text: "October",
    // eslint-disable-next-line
    value: "October" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "November",
    text: "November",
    // eslint-disable-next-line
    value: "November" +" "+ dateHolder.getFullYear(),
  },
  {
    key: "December",
    text: "December",
    // eslint-disable-next-line
    value: "December" +" "+ dateHolder.getFullYear(),
  },
];

for (let i = 0; i < monthsDropdownData.length; i++) {
  if (monthsDropdownData[i].value === currentMonth) {
    defaultDropDownMonth = monthsDropdownData[i];
  }
}
