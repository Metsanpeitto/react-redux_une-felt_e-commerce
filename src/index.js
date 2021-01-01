import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { IntlProvider } from "react-redux-multilingual";
import { StripeProvider } from "react-stripe-elements";

// Components
import Collection from "./components/shop/Collection";
import Product from "./components/shop/Product";
import Cart from "./components/shop/Cart";
import CheckoutSucess from "./components/shop/checkout/Checkout-success";
import Checkout from "./components/shop/checkout/Checkout";
import Wishlist from "./components/shop/Wishlist";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";

// Layouts
import Layout from "./App";

import NotFound from "./layout/404";
import Register from "./layout/register";
import Landing from "./layout/landing/landing";
import Contact from "./layout/contact";
import Faq from "./layout/faq";
import Delivery from "./layout/delivery";
import Story from "./layout/story";
import Privacy from "./layout/privacy";
import Lastest from "./layout/Lastest";
import Workshops from "./layout/Workshops";

// Import custom components
import store from "./app/store";
import translations from "./constants/translations";

import {
  getAllProducts,
  getAllCategories,
  getAllCategoriesPosts,
  getAllExtras,
  getAllPosts,
} from "./actions/Index";

import "./index.scss";

const pK = "pk_test_xhI1GEX6luUTKEj2qQe8biZX00iH1jvMZe";

class Root extends React.Component {
  render() {
    store.dispatch(getAllProducts());
    store.dispatch(getAllCategories());
    store.dispatch(getAllCategoriesPosts());
    store.dispatch(getAllExtras());
    store.dispatch(getAllPosts());

    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale="en">
          <StripeProvider apiKey={pK}>
            <BrowserRouter basename={"/"}>
              <ScrollContext>
                <Switch>
                  <Layout>
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}/`}
                      render={(props) => <Landing {...props} />}
                    />
                    {/*Routes For Layouts*/}
                    <Route
                      path={`${process.env.PUBLIC_URL}/landing`}
                      component={Landing}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/register`}
                      component={Register}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/product/:id`}
                      component={Product}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/collection`}
                      component={Collection}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/cart`}
                      component={Cart}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/checkout`}
                      component={Checkout}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/checkout-success`}
                      component={CheckoutSucess}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/wishlist`}
                      component={Wishlist}
                    />
                    <Route
                      path={`${process.env.PUBLIC_URL}/contact`}
                      component={Contact}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/faq`}
                      component={Faq}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/delivery`}
                      component={Delivery}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/story`}
                      component={Story}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/privacy`}
                      component={Privacy}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/lastest`}
                      component={Lastest}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/404`}
                      component={NotFound}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/posts`}
                      component={Posts}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/post/:id`}
                      component={Post}
                    />

                    <Route
                      path={`${process.env.PUBLIC_URL}/workshops`}
                      component={Workshops}
                    />
                  </Layout>
                </Switch>
              </ScrollContext>
            </BrowserRouter>
          </StripeProvider>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
