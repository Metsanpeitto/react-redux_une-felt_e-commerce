const wooConfig = require("./wooConfig");
const WooCommerceAPI = require("woocommerce-api");

const WooCommerce = new WooCommerceAPI({
  url: wooConfig.siteUrl,
  consumerKey: wooConfig.consumerKey,
  consumerSecret: wooConfig.consumerSecret,
  wpAPI: true,
  version: "wc/v3",
});

const TIMEOUT = 9000;

const removeString = (res) => {
  var newParraf = null;
  if (res !== "") {
    newParraf = res.replace(`<p>`, " ");
    newParraf = newParraf.split(`</p>`, 2);
    newParraf = newParraf[0];
  }

  return newParraf;
};

const getProducts = (parentId) => {
  var categoryId = parentId;
  if (parentId === "products") {
    categoryId = "55";
  }
  return WooCommerce.getAsync(`products?category=${categoryId}&per_page=100`)
    .then((res) => {
      return res.toJSON().body;
    })
    .then((json) => {
      var data = json;
      Object.json1 = JSON.parse(data);
      var items = Object.json1;
      var products = [];
      items.map(
        ({
          id,
          name,
          images,
          price,
          categories,
          description,
          stock_quantity,
          short_description,
          sale_price,
          on_sale,
          tags,
          rating_count,
          average_rating,
        }) => {
          var img;
          var newImages = [];
          images.map((data) => {
            img = data.src;
            return newImages.push(img);
          });

          var stringDescription = removeString(description);
          var stringShortDescription = removeString(short_description);

          var category = null;
          if (categories) {
            if (categories.length > 0) {
              categories.forEach((c) => {
                var name = c.name;
                if (name === "pieces") {
                  category = "pieces";
                }
                if (name === "tools") {
                  category = "tools";
                }
                if (name === "paintings") {
                  category = "paintings";
                }
              });
            }
          }

          const newItem = {
            categories: categories,
            categoryId: categories[0].id,
            category: category,
            description: stringDescription,
            discount: sale_price,
            id: id,
            name: name,
            new: false,
            pictures: newImages,
            length: images.length,
            price: price,
            sale: on_sale,
            salePrice: sale_price,
            shortDetails: stringShortDescription,
            stock: stock_quantity,
            brand: tags,
            colors: ["yellow", "gray", "green"],
            size: ["M", "L", "XL"],
            tags: ["nike", "caprese"],
            rating_count: rating_count,
            average_rating: average_rating,
            variants: null,
          };

          return products.push(newItem); // Push the object
        }
      );
      return products;
    })
    .catch((error) => {
      return error;
    });
};

const getExtras = () => {
  return WooCommerce.getAsync(`products?per_page=5&category=73`)
    .then((res) => {
      return res.toJSON().body;
    })
    .then((json) => {
      var data = json;
      Object.json1 = JSON.parse(data);
      var items = Object.json1;
      var extras = [];
      items.map(({ id, name, images, description, short_description }) => {
        var img;
        var newImages = [];
        images.map((data) => {
          img = data.src;
          return newImages.push(img);
        });

        var newParraf = short_description.replace(`<p>`, " ");
        newParraf = newParraf.split(`</p>`, 2);
        var stringDescription = removeString(description);
        const items = {
          description: stringDescription,
          short_description: newParraf,
          id: id,
          name: name,
          pictures: newImages,
        };
        return extras.push(items);
      });

      return extras;
    })
    .catch((error) => {
      return error;
    });
};

const getCategoryTree = async () => {
  var root = `&parent=55`;
  root = ``;
  var level = 1;
  return await getTheCategories(root, level)
    .then((res) => {
      if (res) {
        return res;
      } else return null;
    })
    .catch((error) => {
      return error;
    });
};

const getTheCategories = (parent, level) => {
  // getExtras();
  return WooCommerce.getAsync(
    `products/categories?hide_empty=true&per_page=100`
  ).then((res) => {
    if (res) {
      var data = res.toJSON().body;
      Object.json1 = JSON.parse(data);
      var items = Object.json1;
      //   var shop = { id: "shop", items: proccessCategories(items, products) };
      var shop = { id: "shop", items: proccessCategories(items) };
      items.push(shop);
      return items;
    } else return null;
  });
};

const proccessCategories = (categoryTree) => {
  if (categoryTree) {
    const categories = categoryTree;
    const pieces = categorySorter(categories, 56);
    const paintings = categorySorter(categories, 79);
    const tools = categorySorter(categories, 81);
    var shop = [];

    if (tools && paintings && pieces) {
      if (tools.length > 0) {
        shop.push({ id: "tools", items: tools, name: "tools" });
      }
      if (paintings.length > 0) {
        shop.push({ id: "paintings", items: paintings, name: "paintings" });
      }
      if (pieces.length > 0) {
        shop.push({ id: "pieces", items: pieces, name: "pieces" });
      }
    }
    return shop;
  }
};

const categorySorter = (categories, parentCategoryId) => {
  //Piecesid = 56
  var itemsLevel1 = []; // Level1 is the parentCategoryId
  var items = [];
  //This looks for all the subcategories of pieces/sculptures(54),tools(64) or painting(75)
  if (categories) {
    if (categories.length > 1) {
      //  var data = { parentId: parentCategoryId, items: [] };
      var data = [];
      var data2 = { parentId: null, items: [], name: null };

      categories.forEach((p) => {
        if (p.parent === parentCategoryId) {
          //56
          itemsLevel1.push(p); // Here are the subcategories in pieces
        }
      });

      if (itemsLevel1.length > 0) {
        // Lets find what belong to Pieces
        itemsLevel1.forEach((p, index) => {
          // console.log(p); // Ladies

          categories.forEach((c) => {
            if (c.parent === p.id) {
              data2.name = p.name;
              data2.parentId = p.id;
              data2.items.push(c); // Put single lady into ladies
            }
          });
          // Now all the ladies are into data2.items

          if (data2.items.length > 0) {
            // if data2.items isnt empty, put the Ladies into
            // the lady group
            // data.items.push(data2);
            data.push(data2);
            data2 = { parentId: null, items: [], name: null };
          }
        });
        items.push(data[0]);
      }

      return items;
    } else return null;
  } else return null;
};

/*
const categorySorter = (categories, categoryId, products) => {
  var items = [];
  //This looks for all the subcategories of pieces/sculptures(54),tools(64) or painting(75)
  categories.map((c) => {
    if (c.parent === categoryId) {
      //    <-- Looks for the category
      const group = {
        item: c,
        items: [],
        id: c.name,
      };
      items.push(group);
    }
  });
  var subItems = [];
  var newItems = items;

  //This are all the items in for example tools .
  //They should be sorted again
  items.map((subItem, index) => {
    categories.map((c) => {
      if (c.parent === subItem.item.id) {
        subItems.push(c);
      }
    });
    newItems[index].items.push(subItems);
    subItems = [];
  });
  return newItems;
};
*/

const postReview = (data) => {
  return WooCommerce.postAsync("products/reviews", data)
    .then((response) => {})
    .catch((error) => {
      console.log(error.response.data);
    });
};

const getReview = (id) => {
  return WooCommerce.getAsync(`products/reviews?product=${id}`)
    .then((res) => {
      var data = res.toJSON().body;
      Object.json1 = JSON.parse(data);
      var reviews = Object.json1;
      return reviews;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

export default {
  getProducts,
  getCategoryTree,
  postReview,
  getReview,
  getExtras,
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT),
};
