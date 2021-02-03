import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HoverMohe from "../../effects/hover/HoverMohe";
import { getAllPosts } from "../../actions/Index";
import store from "../../app/store";
import Loader from "../../effects/loader/Loader";
import PostCard from "./PostCard";

var category = null;
var mounted = null;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], elements: [], category: null, postsToShow: [] };
    this.checkProps = this.checkProps.bind(this);
    this.loadOlder = this.loadOlder.bind(this);
    this.fetchSameCategoryPosts = this.fetchSameCategoryPosts.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  componentWillMount() {
    if (this.props.history.location) {
      var pathname = this.props.history.location.pathname;
      var stringN = pathname.replace("/posts/", "");
      var path = parseInt(stringN);

      this.fetchSameCategoryPosts(path);
    } else {
      this.checkProps();
    }
  }

  componentWillUnmount() {
    /*this.setState(() => {
      return { posts: [], elements: [], category: null, postsToShow: [] };
    });
    */
  }

  fetchSameCategoryPosts(data) {
    var category = parseInt(data);

    if (category) {
      var postsToShow = [];
      var posts = this.props.state.posts.posts;
      if (posts) {
        if (posts.length > 1 && posts !== "empty") {
          posts.map((post) => {
            if (post.categories) {
              if (post.categories.length > 1) {
                post.categories.map((postCategory) => {
                  if (postCategory === category) {
                    postsToShow.push(post);
                  }
                  return null;
                });
              }
            }
            return null;
          });
        }
      }

      if (this.state.posts !== postsToShow) {
        this.setState(() => {
          return { posts: postsToShow };
        });
      }
    }
  }

  loadOlder() {
    var posts = this.props.state.posts.posts;
    if (posts) {
      this.setState(() => {
        return { posts: posts };
      });
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

  checkProps() {
    if (
      this.props.category !== this.state.category &&
      this.props.category !== undefined
    ) {
      category = this.props.category;
      this.setState(() => {
        return { category: category };
      });
      this.fetchSameCategoryPosts(category);
    }

    if (this.props.location.category !== this.state.category) {
      category = this.props.location.category;
      this.setState(() => {
        return { category: category };
      });
      this.fetchSameCategoryPosts(category);
    }
  }

  items = [
    {
      name: "All Posts",
      text: "Discover them all !",
      href: `#`,
    },
  ];

  render() {
    return (
      <section className="c-posts">
        <h1>Posts</h1>

        <div>
          {this.state.posts ? (
            this.state.posts.length > 0 ? (
              <div className="c-posts__content">
                {this.state.posts.map((post, index) => {
                  const data = [post, index];
                  return <PostCard post={data} key={index} />;
                })}
                {this.state.posts.length > 10 ? null : (
                  <div id="older-posts" onClick={this.loadOlder}>
                    <HoverMohe items={this.items} />
                  </div>
                )}
              </div>
            ) : (
              <Loader />
            )
          ) : (
            <Loader />
          )}
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

export default connect(mapStateToProps, { store, getAllPosts })(Posts);
