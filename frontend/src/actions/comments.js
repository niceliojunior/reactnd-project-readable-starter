import { getCommentsByPost, getComment } from '../utils/api';

// GENERIC FUNCIONS
function handleErrors(response) {
  if (!response) {
    throw Error(response.statusText);
    //throw Error(JSON.stringify(response));
  }
  return response;
};  

// COMMENTS BY POST
export const FETCH_COMMENTS_BY_POST_BEGIN = 'FETCH_COMMENTS_BY_POST_BEGIN';
export const FETCH_COMMENTS_BY_POST_SUCCESS = 'FETCH_COMMENTS_BY_POST_SUCCESS';
export const FETCH_COMMENTS_BY_POST_FAILURE = 'FETCH_COMMENTS_BY_POST_FAILURE';

export const fetchCommentsByPostBegin = () => ({
  type: FETCH_COMMENTS_BY_POST_BEGIN
});

export const fetchCommentsByPostSuccess = comments => ({
  type: FETCH_COMMENTS_BY_POST_SUCCESS,
  comments
});

export const fetchCommentsByPostError = error => ({
  type: FETCH_COMMENTS_BY_POST_FAILURE,
  error
});

export function fetchCommentsByPost(id) {
  return dispatch => {
    dispatch(fetchCommentsByPostBegin());
    return getCommentsByPost(id)
      .then(handleErrors)
      .then(res => { dispatch(fetchCommentsByPostSuccess(res)) })
      .catch(error => dispatch(fetchCommentsByPostError(error)))
  };
};