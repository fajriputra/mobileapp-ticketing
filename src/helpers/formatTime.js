export const formatAMPM = date => {
  let hours = date?.slice(0, 2);

  let ampm = hours >= 12 ? `${date}pm` : `${date}am`;

  return ampm;
};
