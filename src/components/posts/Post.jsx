import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/Index";

import Loader from "../../effects/loader/Loader";
import Input from "../../effects/input/Input";
import Comments from "./Comments";
import PathAnimated from "../../layout/PathAnimated";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: null,
      svg: null,
      shapeEl: null,
      contentElems: null,
      contentLinks: null,
      footer: null,
      contentElemsTotal: null,
      img: null,
      title: null,
      posts: [],
      elements: [],
      comments: [],
      author: null,
      name: null,
      render: null,
    };
    this.checkProps = this.checkProps.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  componentWillUnmount() {
    this.setState(() => {
      return {
        script: null,
        svg: null,
        shapeEl: null,
        contentElems: null,
        contentLinks: null,
        footer: null,
        contentElemsTotal: null,
        img: null,
        title: null,
        posts: [],
        elements: [],
        comments: [],
        author: null,
        name: null,
        categoryId: null,
        page: null,
      };
    });
  }

  checkProps() {
    if (this.props) {
      if (this.props.state) {
        if (this.props.state.posts && this.props.state.posts !== undefined) {
          if (this.props.item !== this.state.post) {
            const posts = this.props.state.posts.posts;
            this.setState(() => {
              return {
                posts: posts,
                prev: this.props.prev,
                post: this.props.item,
                next: this.props.next,
                category: this.pr,
              };
            });
          }
        }
      } else {
        if (this.props.match.params.id) {
          var id = this.props.match.params.id;
          this.props.getPost(id);
        }
      }
    }
  }

  newTo(key) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/post/${key}`,
        category: key,
      };
    }
  }

  handleChange(e) {
    const n = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === "password") {
      this.setState(() => {
        return { password: n };
      });
    }
    if (name === "name") {
      this.setState(() => {
        return { name: n };
      });
    }

    if (name === undefined) {
      if (this.state.checked === true) {
        this.setState(() => {
          return { checked: false };
        });
      } else {
        this.setState(() => {
          return { checked: true };
        });
      }
    }
  }

  CommentBox = (data) => {
    return (
      <form className="c-post__comment-form">
        <h3 id="reply-title" className="comment-reply-title">
          Leave a Reply{" "}
        </h3>
        <textarea
          id="comment"
          name="comment"
          title="Enter your comment here..."
          placeholder="Enter your comment here..."
          onChange={this.handleChange}
        ></textarea>
        <div className="comment-form-fields">
          <Input
            type="email"
            name="name"
            id="mail"
            label="mail"
            value={this.state.name}
            handleChange={this.handleChange}
          ></Input>

          <Input
            type="text"
            name="author"
            id="author"
            label="author"
            value={this.state.author}
            handleChange={this.handleChange}
          ></Input>

          <Input
            type="url"
            name="url"
            id="url"
            label="website"
            value={this.state.url}
            handleChange={this.handleChange}
          ></Input>
        </div>
      </form>
    );
  };

  render() {
    if (this.state.post) {
      const title = this.state.post.title;
      const prev = this.state.prev;
      const next = this.state.next;
      var author = null;
      if (this.state.post.author) {
        author = this.state.post.author === 1 ? "Pon" : "Other";
      } else {
        author = this.state.post.p.author === 1 ? "Pon" : "Other";
      }
      var id = null;
      if (this.state.post.p) {
        id = this.state.post.p.id;
      } else {
        id = this.state.post.id_post;
      }
      var date = this.state.post.date;
      const render = this.state.post.render;

      return (
        <section className="c-post">
          {render ? (
            <h1 id="title" className="c-post__title h2-didot-reg">
              {title}
            </h1>
          ) : null}
          <h3 className="c-post__collection-name h3-didot-reg">Exhibition</h3>
          <PathAnimated />
          <div className="c-post__navigation">
            <div className="arrows">
              {prev !== undefined && prev ? (
                <Link
                  to={this.newTo(prev === undefined ? "#" : prev, "post")}
                  onClick={this.closeMenuTrigger}
                  onMouseOver={this.hoverItem}
                  className="previous"
                >
                  <i className="fas fa-arrow-left"></i>
                </Link>
              ) : null}

              <div className="info">
                <h5 className="author">{`by ${author}`}</h5>
                <h5 className="date">{`${date.monthWord}  ${date.day}, ${date.year} `}</h5>
              </div>
              {next !== undefined && next ? (
                <Link
                  to={this.newTo(next === undefined ? "#" : next, "post")}
                  onClick={this.closeMenuTrigger}
                  onMouseOver={this.hoverItem}
                  className="next"
                >
                  <i className="fas fa-arrow-right"></i>
                </Link>
              ) : null}
            </div>
          </div>

          <main>
            <div>
              <div className="render">
                <div dangerouslySetInnerHTML={{ __html: render }} />
              </div>
              <section className="content content--related">
                {id ? <Comments postId={id} /> : null}
              </section>
            </div>
          </main>
        </section>
      );
    } else return <Loader />;
  }
}

const mapStateToProps = (state, ownProps) => {
  var postId = null;
  var item = null;
  var next,
    prev = null;
  var categoryId = null;
  var page = null;

  if (ownProps.match) {
    postId = parseInt(ownProps.match.params.id);
    if (state.posts.posts) {
      if (state.posts.posts !== "empty") {
        categoryId = ownProps.location.categoryId;
        page = ownProps.location.page;
        const posts = state.posts.posts;
        posts.map((p, index) => {
          if (p.p.id === postId) {
            item = p;
            if (posts[index - 1]) {
              prev = posts[index - 1].p.id;
            }

            if (posts[index + 1]) {
              next = posts[index + 1].p.id;
            }
          }
          return item;
        });
        var test = item;
        if (!test) {
          test = state.posts.posts.find((el) => el.id_post === postId);
          item = test;
        }

        if (item) {
          return {
            item: item,
            prev: prev,
            next: next,
            categoryId: categoryId,
            page: page,
            state,
          };
        } else {
          return {
            item: null,
            prev: null,
            next: null,
            categoryId: null,
            page: null,
            state,
          };
        }
      } else {
        if (state.posts.post !== "empty") {
          const post = state.posts.post;

          return {
            item: post,
            prev: post.id_post - 1,
            next: post.id_post + 1,
            categoryId: post.category[0],
            page: 1,
            state,
          };
        } else {
          return {
            item: null,
            prev: null,
            next: null,
            categoryId: null,
            page: null,
            state,
          };
        }
      }
    }
  }
};

export default connect(mapStateToProps, { getPost })(Post);
