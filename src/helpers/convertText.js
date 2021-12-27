export const toPascalCase = text => {
  return text.replace(/\w\S*/g, str => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
};

export const capitalFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
