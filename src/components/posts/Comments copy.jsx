import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import Input from "../../effects/input/Input";
import { getPostComments } from "../../actions/Index";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: "",
      author: "",
      url: "",
      text: "",
      comments: "",
    };
  }

  componentDidMount() {
    if (this.props.postId) {
      const postId = this.props.postId;
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
  }

  CommentsBox = () => {
    const comments = this.props.posts.comments;
    if (comments) {
      if (comments !== "empty") {
        return (
          <section className="c-post__comment--comments">
            <h3 className="comment-title">Comments</h3>
            <div className="box">
              {comments.map((c, index) => {
                return (
                  <div className="box-item" key={index}>
                    <p className="author">Posted by {c.author_name}</p>
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
      }
    }
  };

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

  render() {
    const { translate } = this.props;

    const comments = this.state.comments;
    return (
      <section className="c-post__comment">
        {comments ? <this.CommentsBox /> : null}
        <form className="c-post__comment--form">
          <h3 id="reply-title" className="comment-reply-title">
            {translate("leave_reply")}
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
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps, { getPostComments })(
  withTranslate(Comments)
);
