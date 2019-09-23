const capitalize = (str) => {
  const mainStr = String(str);
  return mainStr.charAt(0).toUpperCase() + mainStr.slice(1);
};

export default capitalize;
