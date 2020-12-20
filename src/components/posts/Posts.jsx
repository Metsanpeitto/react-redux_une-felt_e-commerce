import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HoverMohe from "../../effects/hover/HoverMohe";
import { getAllPosts } from "../../actions/Index";
import store from "../../app/store";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], elements: [] };
    this.checkProps = this.checkProps.bind(this);
    this.loadOlder = this.loadOlder.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  loadOlder() {
    store.dispatch(getAllPosts("all"));
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
    if (this.props.state.posts.posts !== "empty") {
      if (this.props.state.posts.posts !== this.state.posts) {
        const posts = this.props.state.posts.posts;
        this.setState(() => {
          return {
            posts: posts,
          };
        });
      }
    }
  }

  PostCard = (p) => {
    const post = p.post;
    console.log(p);
    if (post.p.excerpt) {
      if (post.p.content.rendered) {
        var img = post.thumbnail;
        var title = post.title;
        var date = post.date;
        var id = post.p.id;

        if (img) {
          return (
            <Link
              to={this.newTo(id, "post")}
              key={title}
              name={title}
              className="post-card"
            >
              <h5 className="post-card__title">{title}</h5>
              <p className="post-card__date">{`${date.monthWord} ${date.day},${date.year}`}</p>
              <img src={`${img}`} alt="thumbnail" />
            </Link>
          );
        } else return null;
      } else return null;
    } else return null;
  };

  items = [
    {
      name: "All Posts",
      text: "Discover them all !",
      href: `#`,
    },
  ];

  render() {
    console.log(this.state.posts);
    return (
      <section className="c-posts">
        <h1>Posts</h1>

        <div>
          {this.state.posts ? (
            this.state.posts.length > 0 ? (
              <div className="c-posts__content">
                {this.state.posts.map((post, index) => {
                  return <this.PostCard post={post} key={index} />;
                })}
                {this.state.posts.length > 10 ? null : (
                  <HoverMohe items={this.items} onClick={this.loadOlder} />
                )}
              </div>
            ) : (
              <p>Loading</p>
            )
          ) : (
            <p>Loading</p>
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
