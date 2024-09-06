const filterByCategory = (data, category) => {
  return data.filter((data) => data.name === category);
};
export default filterByCategory;
