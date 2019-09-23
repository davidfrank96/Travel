const millisecondsPerDay = 1000 * 60 * 60 * 24;

const dateDifference = (dateOne, dateTwo) => {
  const formattedDateOne = dateOne.replace(/[-./,:\s]/g, '-');
  const formattedDateTwo = dateTwo.replace(/[-./,:\s]/g, '-');
  const date1 = Date.parse(formattedDateOne);
  const date2 = Date.parse(formattedDateTwo);
  const today = Date.now();
  const checkIfValid = Math.round((date1 - today) / millisecondsPerDay);
  if (checkIfValid < 0) return 'negative value';
  const duration = Math.round((date2 - date1) / millisecondsPerDay);
  if (duration <= 0) return false;
  return true;
};

export default dateDifference;
