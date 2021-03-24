import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/Index";
import store from "../../app/store";
import Loader from "../../effects/loader/Loader";
import PostCard from "./PostCard";
import PathAnimated from "../../layout/PathAnimated";
import LittleHeart from "../../icons/LittleHeart";

//  To be able to navigate the post I have to know the category of the post
// and keep track of the downloaded page ( which includes a limit of 5 posts ).
//  So when navigating pressing the arrow to the right, the first option is
// to iterate through the existing page, stored in a collection array. If the
// iterator function detects that the element is the last one in the
// array, it will check it the next page it's present in the collection array.
//  I the case when the page isn't present it will request a download with
// 2 parameters, Page and Collection ( category ).

//  To access again, already visited posts
// there is not need for request once again from the server, they should be saved in
// an array, here in collections ( as well as in window.SessionStorage )

// Anatomy of collection:
// [ Page 1 (5 posts per page ) ->[post1, post2, post3, ...] Page N -> [post6] [post7] [post8]]

//  Take in consideration the existance of 8 different collections ( categories ). So each category
// will have each own place.
const categoryNames = [
  "c_uncategorized",
  "c_about",
  "c_case",
  "c_exhibition",
  "c_feltedwool",
  "c_mag",
  "c_tool",
  "c_workshop",
];

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // Posts in a page
      elements: [],
      category: null, // The collection of posts
      count_category: null, // the total number of posts in this category
      count_downloaded: null, // The count of downloaded posts
      count_pages: null,
      page: 0, // The index of the present page
      page_to: 1, // The desired new page to be open
      requesting_flag: null, // Helps to track the proccess
      c_about: [], // |
      c_exhibition: [], // |
      c_case: [], // |
      c_feltedwool: [], // |  Collections of posts (categories)
      c_mag: [], // |
      c_tool: [], // |
      c_Uncategorized: [], // |
      c_workshop: [], // |
      postsToShow: [], // | Posts to be shown ()
    };
    this.checkProps = this.checkProps.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.loadCategory = this.loadCategory.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }
  // Here the app will receive the category to find
  UNSAFE_componentWillMount() {
    this.loadCategory();
  }

  loadCategory() {
    if (
      this.props.history.location &&
      this.props.history.location !== undefined
    ) {
      var categoryId = this.props.history.location.category;
      // category.count says the total number of posts in the collection
      // this will be used to create an index navigation
      const postCategories = this.props.state.posts.categoryTreePosts;
      var count = 0;
      // Find the received category Id in the array of categories
      // Get the total number of posts

      postCategories.forEach((p_c) => {
        if (p_c.id_post === categoryId) {
          count = p_c.count;
        }
      });

      // Get the number of the page to be requested.Default : 0 or 1?
      var page_to = 1;
      // Use the category Id and the page number to realize the request
      const data = { categoryId: categoryId, page_to: page_to };

      this.props.getPosts(data);
      // The array must have the number of pages needed, that makes the indexation easier
      // So with count and the number of items per page (6), the number of pages is calculated

      var collectionHolder = [];
      var pages = count / 6;
      for (var i = 0; i < pages; i++) {
        collectionHolder.push([]);
      }
      var result = pages - Math.floor(pages) !== 0;
      if (result) {
        pages++;
      }
      this.setState(() => {
        return {
          requesting_flag: true,
          category: categoryId,
          count_category: count,
          count_pages: pages,
          [categoryNames[categoryId - 1]]: collectionHolder,
        };
      });
    } else {
      this.checkProps();
    }
  }

  checkProps() {
    if (
      this.props.history.location &&
      this.props.history.location !== undefined
    ) {
      var categoryId = this.props.history.location.category;
      if (categoryId !== this.state.category) {
        this.loadCategory();
      }
    }

    if (this.props.state.posts.posts) {
      if (this.props.state.posts.posts.length > 1) {
        var posts = this.props.state.posts.posts;
        if (!this.state.posts || this.state.posts !== posts) {
          if (posts !== "empty") {
            var page = this.state.page;
            var page_to = this.state.page_to;
            if (this.state.requesting_flag) {
              page = this.state.page_to;
              page_to = page + 1;
            }

            const category = this.state.category;
            // The posts belong to a page and that page has it's own place
            // within the collection array
            var storedPosts = [];
            storedPosts = this.state[categoryNames[category - 1]];

            if (storedPosts) {
              if (storedPosts.length > 0) {
                if (storedPosts[page]) {
                  if (posts !== storedPosts[page]) {
                    storedPosts[page].push(posts);
                  }
                }
              }
            }
            window.scrollTo(0, 0);

            this.setState(() => {
              return {
                posts: posts,
                [categoryNames[category - 1]]: storedPosts,
                requesting_flag: false,
                page: page,
                page_to: page_to,
              };
            });
          }
        }
      }
    }
  }

  // This helps to open the selected produt in a dedicated window
  newTo(key) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/post/${key}`,
        category: key,
      };
    }
  }

  // Handle the click in the page index and request download the page if needed
  goToPage(e) {
    var page_to = parseInt(e.currentTarget.id);
    var category = this.state.category;
    var page = this.state.page;
    var posts = [];

    if (page_to < page) {
      var collection = categoryNames[category - 1];
      posts = collection[page_to];
      if (posts.length > 1) {
        this.setState(() => {
          return {
            requesting_flag: true,
            page_to: page_to,
            posts: posts,
          };
        });
      } else {
        this.setState(() => {
          return {
            requesting_flag: true,
            page_to: page_to,
          };
        });
        const data = {
          categoryId: parseInt(this.state.category),
          page_to: page_to,
        };
        this.props.getPosts(data);
      }
    } else {
      this.setState(() => {
        return {
          requesting_flag: true,
          page_to: page_to,
        };
      });

      const data = {
        categoryId: parseInt(this.state.category),
        page_to: page_to,
      };

      this.props.getPosts(data);
    }
  }

  items = [
    {
      name: "All Posts",
      text: "Discover them all !",
      href: `#`,
    },
  ];

  /** A row of link numbers should appear here and give access
   * to the collection page stored, in the case of already downloaded
   * posts.
   *  And for the pages not in the collection a request will be placed
   * and its data propperly fetched in the array.
   *
   * needed : page , collection, count_pages , getPosts()
   */

  render() {
    const posts = this.state.posts;
    const categoryId = this.state.category;
    var collection = [];
    var category_name = null;
    var page = null;

    if (categoryId) {
      if (this.state[categoryNames[categoryId - 1]]) {
        collection = this.state[categoryNames[categoryId - 1]];
        page = this.state.page;
      }
      if (this.props.state) {
        if (this.props.state.posts && this.props.state.posts !== undefined) {
          const categories = this.props.state.posts.categoryTreePosts;
          categories.forEach((c) => {
            if (c.description.id === categoryId) {
              category_name = c.description.name;
            }
          });
        }
      }
    }

    return (
      <section className="c-posts">
        <PathAnimated />
        <LittleHeart />
        <h1 className="h2-didot-reg">Posts</h1>
        {category_name ? (
          <h3 className="h3-didot-reg">{category_name}</h3>
        ) : null}
        <div>
          {posts ? (
            posts.length > 1 ? (
              <div className="c-posts__content">
                {posts.map((post, index) => {
                  const data = [post, index, categoryId, page];
                  return <PostCard post={data} key={index} />;
                })}
              </div>
            ) : (
              <Loader />
            )
          ) : (
            <Loader />
          )}
          <div className="index">
            {collection.length > 1 ? (
              collection.map((p, index) => {
                var page = this.state.page;
                if (page === index + 1) {
                  return (
                    <button
                      className="invisible-button Label current-page"
                      key={index + 1}
                      id={index + 1}
                      onClick={this.goToPage}
                    >
                      {index + 1}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="invisible-button Label"
                      key={index + 1}
                      id={index + 1}
                      onClick={this.goToPage}
                    >
                      {index + 1}
                    </button>
                  );
                }
              })
            ) : (
              <h3 className="Label">1</h3>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, { store, getPosts })(Posts);
