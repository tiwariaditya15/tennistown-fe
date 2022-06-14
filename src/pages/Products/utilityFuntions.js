export function getSortedData(sortBy, data) {
  if (sortBy === null) {
    return [...data];
  }

  if (sortBy === "LOWTOHIGH") {
    return data.sort(
      (product1, product2) =>
        product1.price.discounted - product2.price.discounted
    );
  }

  if (sortBy === "HIGHTOLOW") {
    return data.sort(
      (product1, product2) =>
        product2.price.discounted - product1.price.discounted
    );
  }

  return [...data];
}

export function getFilteredData(filters, sortedData) {
  if (filters.selectedBrand === "" && filters.selectedLevel === "") {
    return [...sortedData];
  }

  if (filters.selectedBrand?.length) {
    if (filters.selectedLevel?.length) {
      return sortedData
        .filter((product) => product.brand === filters.selectedBrand)
        .filter(
          (product) =>
            product.level.toLowerCase() === filters.selectedLevel.toLowerCase()
        );
    }
    return sortedData.filter(
      (product) =>
        product.brand.toLowerCase() === filters.selectedBrand.toLowerCase()
    );
  }

  if (filters.selectedLevel?.length) {
    if (filters.selectedBrand?.length) {
      return sortedData
        .filter(
          (product) =>
            product.level.toLowerCase() === filters.selectedLevel.toLowerCase()
        )
        .filter(
          (product) =>
            product.brand.toLowerCase() === filters.selectedBrand.toLowerCase()
        );
    }
    return sortedData.filter(
      (product) =>
        product.level.toLowerCase() === filters.selectedLevel.toLowerCase()
    );
  }
  return [...sortedData];
}
