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

const getProducts = () => {
  return WooCommerce.getAsync(`products?per_page=30&category=55`)
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
          categories.map((c) => {
            var name = c.name;
            if (name == "pieces") {
              category = "pieces";
            }
            if (name == "tools") {
              category = "tools";
            }
            if (name == "paintings") {
              category = "paintings";
            }
          });

          const newItem = {
            categories: categories,
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
  var root = ``;
  var level = 1;
  return await getTheCategories(root, level).then((res) => {
    if (res) {
      return res;
    } else return null;
  });
};

const getTheCategories = (parent, level) => {
  getExtras();
  return WooCommerce.getAsync(
    `products/categories?hide_empty=false&per_page=100`
  ).then((res) => {
    if (res) {
      var data = res.toJSON().body;
      Object.json1 = JSON.parse(data);
      var items = Object.json1;
      var shop = { id: "shop", items: proccessCategories(items) };
      items.push(shop);
      return items;
    } else return null;
  });

  return null;
};

const proccessCategories = (categoryTree) => {
  if (categoryTree) {
    const categories = categoryTree;
    const pieces = categorySorter(categories, 56);
    const paintings = categorySorter(categories, 79);
    const tools = categorySorter(categories, 65);

    var shop = [
      { id: "tools", items: tools },
      { id: "paintings", items: paintings },
      { id: "pieces", items: pieces },
    ];

    return shop;
  }
};

const categorySorter = (categories, categoryId) => {
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
