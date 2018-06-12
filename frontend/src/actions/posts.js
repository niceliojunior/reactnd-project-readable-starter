import { getPosts, getPostsByCategory } from '../utils/api';

// GENERIC FUNCIONS
function handleErrors(response) {
  if (!response) {
    throw Error(response.statusText);
    //throw Error(JSON.stringify(response));
  }
  return response;
};  

// ALL POSTS
export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsError = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return getPosts()
      .then(handleErrors)
      .then(res => { 
        dispatch(fetchPostsSuccess(res));
        return res;
      })
      .catch(error => dispatch(fetchPostsError(error))
      )
  };
};

// POSTS BY CATEGORY
export const FETCH_POSTS_BY_CATEGORY_BEGIN = 'FETCH_POSTS_BY_CATEGORY_BEGIN';
export const FETCH_POSTS_BY_CATEGORY_SUCCESS = 'FETCH_POSTS_BY_CATEGORY_SUCCESS';
export const FETCH_POSTS_BY_CATEGORY_FAILURE = 'FETCH_POSTS_BY_CATEGORY_FAILURE';

export const fetchPostsByCategoryBegin = () => ({
  type: FETCH_POSTS_BY_CATEGORY_BEGIN
});

export const fetchPostsByCategorySuccess = posts => ({
  type: FETCH_POSTS_BY_CATEGORY_SUCCESS,
  payload: { posts }
});

export const fetchPostsByCategoryError = error => ({
  type: FETCH_POSTS_BY_CATEGORY_FAILURE,
  payload: { error }
});

export function fetchPostsByCategory(category) {
  return dispatch => {
    dispatch(fetchPostsByCategoryBegin());
    return getPostsByCategory(category)
      .then(handleErrors)
      .then(res => { 
        dispatch(fetchPostsByCategorySuccess(res));
        return res;
      })
      .catch(error => dispatch(fetchPostsByCategoryError(error))
      )
  };
};