const getChangedDataOnly = (original, edited, keyArray) => {
  const newObj = {};
  keyArray.forEach(key => {
    if (original[key] !== edited[key]) {
      newObj[key] = edited[key];
    }
  });
  return newObj;
};

export default getChangedDataOnly;
