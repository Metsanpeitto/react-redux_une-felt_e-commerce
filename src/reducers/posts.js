import {
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  POST_COMMENT,
  FETCH_CATEGORYTREE_POSTS,
  RECEIVE_CATEGORYTREE_POSTS,
} from "../constants/ActionTypes";

const initialState = {
  categoryTreePosts: [],
  categoryPost: [],
  posts: "empty",
  comments: "empty",
  postComment: "empty",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, posts: action.posts };

    case RECEIVE_COMMENTS:
      return { ...state, comments: action.comments };

    case POST_COMMENT:
      return { ...state, postComment: action.postComment };

    case RECEIVE_CATEGORYTREE_POSTS:
      return {
        ...state,
        categoryTreePosts: action.categoryTreePosts,
      };

    case FETCH_CATEGORYTREE_POSTS:
      if (
        state.categoryTreePosts.findIndex((category) => {
          if (category.id !== -1) {
            const singleCategoryPost = state.categoryTreePosts.reduce(
              (categoryTreePost) => {
                return categoryTreePost;
              },
              []
            );

            return {
              ...state,
              categoryPost: singleCategoryPost,
            };
          } else return null;
        })
      );
      break;

    default:
      return state;
  }
};

export default postsReducer;
