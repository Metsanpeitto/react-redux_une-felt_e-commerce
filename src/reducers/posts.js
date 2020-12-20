import { RECEIVE_POSTS, RECEIVE_COMMENTS } from "../constants/ActionTypes";

const initialState = {
  posts: "empty",
  comments: "empty",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, posts: action.posts };

    case RECEIVE_COMMENTS:
      return { ...state, comments: action.comments };

    default:
      return state;
  }
};

export default postsReducer;
