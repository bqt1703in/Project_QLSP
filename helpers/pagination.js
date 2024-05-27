module.exports = (objPagination, countProduct, query) => {
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }
  objPagination.skip =
    (objPagination.currentPage - 1) * objPagination.limitItems;
  objPagination.totalPage = Math.ceil(countProduct / objPagination.limitItems);
  return objPagination;
};
