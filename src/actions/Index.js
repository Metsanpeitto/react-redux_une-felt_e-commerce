import shop from "../api/shop";
import user from "../api/user";
import posts from "../api/posts";
import contact from "../api/mailChimp";
import * as types from "../constants/ActionTypes";
import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.min.css";
//import "react-toastify/dist/ReactToastify.css";

/**           POSTS                    */

export const getAllPosts = (amount) => (dispatch) => {
  posts.getPostList(amount).then((posts) => {
    dispatch(getAllCategoriesPosts(posts));
    dispatch(receivePosts(posts));
    return posts;
  });
};

export const receivePosts = (posts) => ({
  type: types.RECEIVE_POSTS,
  posts,
});

export const getPostComments = (postId) => (dispatch) => {
  posts.getComments(postId).then((comments) => {
    dispatch(receiveComments(comments));
    return comments;
  });
};

export const receiveComments = (comments) => ({
  type: types.RECEIVE_COMMENTS,
  comments,
});

/**        END  POSTS                  */

/**           CATEGORY TREE OF POSTS ACTIONS          */

export const fetchCategoryTreePostsBegin = () => ({
  type: types.FETCH_CATEGORYTREE_POSTS_BEGIN,
});

export const fetchCategoryTreePosts = (categoryPosts) => ({
  type: types.FETCH_CATEGORYTREE_POSTS,
  categoryPosts,
});

export const receiveCategoryTreePosts = (categoryTreePosts) => ({
  type: types.RECEIVE_CATEGORYTREE_POSTS,
  categoryTreePosts,
});

export const getAllCategoriesPosts = (data) => (dispatch) => {
  dispatch(fetchCategoryTreePostsBegin());
  posts.getCategoryTree(data).then((categoryTreePosts) => {
    if (categoryTreePosts) {
      dispatch(receiveCategoryTreePosts(categoryTreePosts));
      return categoryTreePosts;
    }
  });
};

/**      END  CATEGORYTREE POSTS ACTIONS          */

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const getAllProducts = () => (dispatch) => {
  dispatch(fetchProductsBegin());
  shop.getProducts().then((products) => {
    dispatch(receiveProducts(products));
    return products;
  });
};

export const fetchSingleProduct = (productId) => ({
  type: types.FETCH_SINGLE_PRODUCT,
  productId,
});

export const fetchSelectedProductsBegin = () => ({
  type: types.FETCH_SELECTEDPRODUCTS_BEGIN,
});

export const receiveSelectedProducts = (products) => ({
  type: types.RECEIVE_SELECTEDPRODUCTS,
  products,
});

export const addSelectedProducts = (selected) => (dispatch) => {
  dispatch(fetchSelectedProductsBegin());
  dispatch(receiveSelectedProducts(selected));
  return selected;
};

export const fetchSingleSelectedProduct = (productId) => ({
  type: types.FETCH_SINGLE_SELECTEDPRODUCT,
  productId,
});

export const searchProduct = (productName) => ({
  type: types.SEARCH_PRODUCT,
  productName,
});

export const postReviewDone = () => ({
  type: types.POST_REVIEW_DONE,
});

export const postReview = (data) => (dispatch) => {
  shop.postReview(data).then((res) => {
    this.toast.success("Review posted successfullly");
    dispatch(postReviewDone());
    return res;
  });
};

export const receiveReviews = (reviews) => ({
  type: types.RECEIVE_REVIEWS,
  reviews,
});

export const fetchedReviews = (reviews) => ({
  type: types.FETCHED_REVIEW_DONE,
  reviews,
});

export const getReviews = (id) => (dispatch) => {
  shop.getReview(id).then((res) => {
    dispatch(receiveReviews(res));
    dispatch(fetchedReviews(res));
    return res;
  });
};

/**      END  PRODUCTS ACTIONS          */

/**           CATEGORYTREE ACTIONS          */

export const fetchCategoryTreeBegin = () => ({
  type: types.FETCH_CATEGORYTREE_BEGIN,
});

export const fetchCategoryTree = (category) => ({
  type: types.FETCH_CATEGORYTREE,
  category,
});

export const receiveCategoryTree = (categoryTree) => ({
  type: types.RECEIVE_CATEGORYTREE,
  categoryTree,
});

export const getAllCategories = () => (dispatch) => {
  dispatch(fetchCategoryTreeBegin());
  shop.getCategoryTree().then((categoryTree) => {
    if (categoryTree) {
      dispatch(receiveCategoryTree(categoryTree));
      return categoryTree;
    }
  });
};

/**      END  CATEGORYTREE ACTIONS          */

/*        GET EXTRAS                        */
export const fetchExtrasBegin = () => ({
  type: types.FETCH_EXTRAS_BEGIN,
});

export const receiveExtras = (extras) => ({
  type: types.RECEIVE_EXTRAS,
  extras,
});

export const getAllExtras = () => (dispatch) => {
  dispatch(fetchExtrasBegin());
  shop.getExtras().then((extras) => {
    dispatch(receiveExtras(extras));
    return extras;
  });
};
/*        GET EXTRAS    END                */

/**          USER               */
export const fetchLoginBegin = () => ({
  type: types.FETCH_LOGIN_BEGIN,
});

export const fetchLogin = (log) => ({
  type: types.FETCH_LOGIN,
  log,
});

export const receiveLogin = (log) => ({
  type: types.RECEIVE_LOGIN,
  log,
});

export const login = (userData) => (dispatch) => {
  dispatch(fetchLoginBegin());
  user.login(userData).then((log) => {
    if (log == undefined || log == "error") {
      toast.error("\xa0\xa0 🙈 \xa0\xa0 Account not recognized.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`\xa0\xa0 🤗 \xa0\xa0 Account logged-in successfullly`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    //toast.success("Account logged-in successfullly");
    dispatch(receiveLogin(log));
    return log;
  });
};

export const logout = () => (dispatch) => {
  dispatch(closeConnection());
  toast.error("\xa0\xa0 👋 \xa0\xa0 User logged out", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.error("User logged out");
  dispatch(clearCart());
  dispatch(clearWishlist());
  dispatch(clearCompare());
};

export const closeConnection = () => ({
  type: types.LOGOUT,
});

export const signupBegin = () => ({
  type: types.SIGNUP_BEGIN,
});

export const receiveSignup = (log) => ({
  type: types.RECEIVE_SIGNUP,
  log,
});

export const signup = (userData) => (dispatch) => {
  dispatch(signupBegin());
  user.signup(userData).then((log) => {
    toast.success("\xa0\xa0 🎉 \xa0\xa0 Account created successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // toast.success("Account created successfully");
    dispatch(receiveSignup(log));
    dispatch(login(userData));
    return log;
  });
};

export const receiveUpdatedAccount = (log) => ({
  type: types.RECEIVE_UPDATED_ACCOUNT,
  log,
});

export const updateAccount = (userData, userOldData) => (dispatch) => {
  user.updateAccount(userData, userOldData).then((log) => {
    toast.success("\xa0\xa0 🍭 \xa0\xa0 Account updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //toast.success("Account updated successfully");
    dispatch(receiveUpdatedAccount(log));
    return log;
  });
};

/**            USER    END           */

/**             ORDER                */

export const orderBegin = () => ({
  type: types.ORDER_BEGIN,
});

export const receiveOrderReceipt = (rec) => ({
  type: types.RECEIVE_ORDER_RECEIPT,
  rec,
});

export const placeOrder = (orderData) => (dispatch) => {
  dispatch(orderBegin());
  user.order(orderData).then((rec) => {
    toast.success("\xa0\xa0 👌 \xa0\xa0 Order placed successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //  toast.success("Order placed successfully");
    dispatch(receiveOrderReceipt(rec));
    dispatch(clearCart());
    return rec;
  });
};

/**             ORDER    END            */

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => (dispatch) => {
  toast.success("\xa0\xa0 🎁 \xa0\xa0 Item Added to Cart!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  //toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
};
export const addToCartAndRemoveWishlist = (product, qty) => (dispatch) => {
  toast.success("\xa0\xa0 🎁 \xa0\xa0Item Added to Cart!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
  dispatch(removeFromWishlist(product));
};
export const addToCartUnsafe = (product, qty) => ({
  type: types.ADD_TO_CART,
  product,
  qty,
});
export const removeFromCart = (product_id) => (dispatch) => {
  toast.error("\xa0\xa0 😔 \xa0\xa0 Item Decrement Qty to Cart", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  //toast.error("Item Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id,
  });
};

export const incrementQty = (product, qty) => (dispatch) => {
  toast.success("\xa0\xa0 😊 \xa0\xa0 Item Added to Cart!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
};

export const decrementQty = (productId) => (dispatch) => {
  toast.error("\xa0\xa0 😔 \xa0\xa0Item Decrement Qty to Cart", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.warn("Item Decrement Qty to Cart");
  dispatch({
    type: types.DECREMENT_QTY,
    productId,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_CART,
  });
};

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
  toast.success("\xa0\xa0 ❤️ \xa0\xa0 Item Added to Wishlist!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.success("Item Added to Wishlist");
  dispatch(addToWishlistUnsafe(product));
};

export const addToWishlistUnsafe = (product) => ({
  type: types.ADD_TO_WISHLIST,
  product,
});

export const removeFromWishlist = (product_id) => (dispatch) => {
  toast.error("\xa0\xa0 😢 \xa0\xa0 Item Removed from Wishlist", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  //toast.error("Item Removed from Wishlist");
  dispatch({
    type: types.REMOVE_FROM_WISHLIST,
    product_id,
  });
};

export const clearWishlist = () => ({
  type: types.CLEAR_WISHLIST,
});

//Compare Products
export const addToCompare = (product) => (dispatch) => {
  toast.success("Item Added to Compare");
  dispatch(addToCompareUnsafe(product));
};

export const addToCompareUnsafe = (product) => ({
  type: types.ADD_TO_COMPARE,
  product,
});

export const removeFromCompare = (product_id) => ({
  type: types.REMOVE_FROM_COMPARE,
  product_id,
});

export const clearCompare = () => ({
  type: types.CLEAR_COMPARE,
});

// Filters
export const filterBrand = (brand) => ({
  type: types.FILTER_BRAND,
  brand,
});
export const filterColor = (color) => ({
  type: types.FILTER_COLOR,
  color,
});
export const filterPrice = (value) => ({
  type: types.FILTER_PRICE,
  value,
});
export const filterSort = (sort_by) => ({
  type: types.SORT_BY,
  sort_by,
});

export const changeLayout = (grid) => ({
  type: types.CHANGE_LAYOUT,
  grid,
});

// Currency
export const changeCurrency = (symbol) => ({
  type: types.CHANGE_CURRENCY,
  symbol,
});

// MailChimp email newsletter subscription

export const subscriptionDone = (res) => ({
  type: types.SUBSCRIPTION_DONE,
  res,
});

export const subscribeNewsletter = (email, firstname, lastname) => (
  dispatch
) => {
  contact(email, firstname, lastname).then((res) => {
    toast.success("\xa0\xa0 👯 \xa0\xa0 Subscribtion done successfullly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //toast.success("Subscribtion done successfullly");
    dispatch(subscriptionDone(res));
  });
};
