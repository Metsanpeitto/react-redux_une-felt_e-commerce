// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
  let min = 100,
    max = 1000;

  products.map((product) => {
    let v = product.price;
    min = v < min ? v : min;
    max = v > max ? v : max;
    return {
      min,
      max,
    };
  });

  return {
    min: min,
    max: max,
  };
};

export const getCategories = (data) => {
  return data;
};

export const getVisibleproducts = (data, filters, data2, data3) => {
  const { brand, color, value, sortBy } = filters;
  var products = null;

  if (data3) {
    if (data3.productsToShow) {
      products = data3.productsToShow;
    } else {
      products = data.products;
    }
  } else {
    products = data.products;
  }
  var newData = products.filter((product) => {
    let brandMatch;
    if (product.tags && brand)
      brandMatch = product.tags.some((tag) => brand.includes(tag));
    else brandMatch = true;

    let colorMatch;
    if (color && product.colors) {
      colorMatch = product.colors.includes(color);
    } else {
      colorMatch = true;
    }

    const startPriceMatch =
      typeof value.min !== "number" || value.min <= product.price;
    const endPriceMatch =
      typeof value.max !== "number" || product.price <= value.max;

    return brandMatch && colorMatch && startPriceMatch && endPriceMatch;
  });

  newData = products.sort((product1, product2) => {
    if (sortBy === "HighToLow") {
      return product2.price < product1.price ? -1 : 1;
    } else if (sortBy === "LowToHigh") {
      return product2.price > product1.price ? -1 : 1;
    } else if (sortBy === "Newest") {
      return product2.id < product1.id ? -1 : 1;
    } else if (sortBy === "AscOrder") {
      return product1.name.localeCompare(product2.name);
    } else if (sortBy === "DescOrder") {
      return product2.name.localeCompare(product1.name);
    } else {
      return product2.id > product1.id ? -1 : 1;
    }
  });
  const res = [data.products, newData];
  return res;
};

export const getCartTotal = (cartItems) => {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var thisPrice = parseFloat(cartItems[i].price).toFixed(2);
    //  var thisDiscount = parseFloat(cartItems[i].discount);
    //parseInt(cartItems[i].qty, 10) *
    // parseInt((cartItems[i].price * cartItems[i].discount) / 100, 10);
    //  thisDiscount = (thisPrice * thisDiscount) / 100;
    //thisPrice -= thisDiscount;
    thisPrice = thisPrice * 100;
    var thisTotal = thisPrice * cartItems[i].qty;
    thisTotal = thisTotal / 100;
    //thisTotal = parsefloat(thisTotal.toFixed(2));
    total += thisTotal;
  }
  total = total.toFixed(2);

  return total;
};

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
  const items = products.filter((product) => {
    return product.category === type;
  });
  return items.slice(0, 5);
};

// Get TOP Collection
export const getTopCollection = (products) => {
  const items = products.filter((product) => {
    return product.rating > 4;
  });
  return items.slice(0, 8);
};

// Get New Products
export const getNewProducts = (products, type) => {
  const items = products.filter((product) => {
    return product.new === true && product.category === type;
  });

  return items.slice(0, 8);
};

// Get Related Items
export const getRelatedItems = (products, type) => {
  const items = products.filter((product) => {
    return product.category === type;
  });

  return items.slice(0, 4);
};

// Get Single Product
export const getSingleItem = (products, id) => {
  const items = products.find((element) => {
    return element.id === id;
  });
  return items;
};
