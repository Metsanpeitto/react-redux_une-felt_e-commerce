import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import Input from "../../effects/input/Input";
import { getPostComments, postComment } from "../../actions/Index";
import Button from "../../components/ButtonNew";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      author: "",
      url: "",
      postComment: "",
      postId: null,
      text: "",
      comments: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.postId);
    if (this.props.postId) {
      const postId = this.props.postId;
      this.setState(() => {
        return { postId: postId };
      });
      this.props.getPostComments(postId);
    }
  }

  componentDidUpdate() {
    if (this.props.posts.comments) {
      if (this.props.posts.comments !== this.state.comments) {
        var comments = this.props.posts.comments;
        this.setState(() => {
          return { comments: comments };
        });
      }
    }

    if (this.props.postId !== this.state.postId) {
      console.log(this.props.postId);

      const postId = this.props.postId;
      this.setState(() => {
        return { postId: postId };
      });
      this.props.getPostComments(postId);
    }
  }

  CommentsBox = () => {
    const comments = this.props.posts.comments;
    if (comments) {
      if (comments !== "empty") {
        return (
          <section className="c-post__comment--comments">
            <h3 className="comment-title subtitle-lg">Comments</h3>
            <div className="box">
              {comments.map((c, index) => {
                return (
                  <div className="box-item" key={index}>
                    <h3 className="author subtitle-reg">
                      Posted by {c.author_name}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: c.text,
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  handleChange(e) {
    const n = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === "author") {
      this.setState(() => {
        return { author: n };
      });
    }
    if (name === "email") {
      this.setState(() => {
        return { email: n };
      });
    }

    if (name === "url") {
      this.setState(() => {
        return { url: n };
      });
    }

    if (name === "postComment") {
      this.setState(() => {
        return { postComment: n };
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

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email.length > 0 && this.state.author.length > 0) {
      if (this.state.postComment) {
        localStorage.postComment = this.state.postComment;
        localStorage.email = this.state.email;
        localStorage.author = this.state.author;
        localStorage.url = this.state.url;
      } else {
        localStorage.postComment = null;
        localStorage.email = null;
        localStorage.author = null;
        localStorage.url = null;
      }
      const userData = {
        postComment: this.state.postComment,
        email: this.state.email,
        author: this.state.author,
        url: this.state.url,
        postId: this.state.postId,
      };

      this.props.postComment(userData);
    }
  }

  render() {
    const { translate } = this.props;

    const comments = this.state.comments;
    return (
      <section className="c-post__comment">
        {comments ? <this.CommentsBox /> : null}
        <form className="c-post__comment--form" onSubmit={this.handleSubmit}>
          <h3 id="reply-title" className="comment-reply-title subtitle-reg">
            {translate("leave_reply")}
          </h3>
          <textarea
            id="postComment"
            name="postComment"
            title="Enter your comment here..."
            placeholder="Enter your comment here..."
            onChange={this.handleChange}
            className="parraf-lg"
          ></textarea>
          <div className="comment-form-fields">
            <Input
              type="email"
              name="email"
              id="mail"
              label="mail"
              value={this.state.email}
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

            <Button
              label="Post"
              type="submit"
              handler={this.handleSubmit}
              href="#"
            />
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps, { getPostComments, postComment })(
  withTranslate(Comments)
);
