import {
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  FETCH_CATEGORYTREE_POSTS,
  RECEIVE_CATEGORYTREE_POSTS,
} from "../constants/ActionTypes";

const initialState = {
  categoryTreePosts: [],
  categoryPost: [],
  posts: "empty",
  comments: "empty",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      console.log(state);
      return { ...state, posts: action.posts };

    case RECEIVE_COMMENTS:
      return { ...state, comments: action.comments };

    case RECEIVE_CATEGORYTREE_POSTS:
      console.log(state);
      console.log(action.categoryTreePosts);

      return {
        ...state,
        categoryTreePosts: action.categoryTreePosts,
      };

    case FETCH_CATEGORYTREE_POSTS:
      console.log(state);
      if (
        state.categoryTreePosts.findIndex((category) => {
          console.log(category);
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
