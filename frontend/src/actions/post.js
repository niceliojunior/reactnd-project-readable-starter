import { getPost } from '../utils/api';

export const FETCH_POST_BEGIN = 'FETCH_POST_BEGIN';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

// GENERIC FUNCIONS
function handleErrors(response) {
  if (!response) {
    throw Error(response.statusText);
    //throw Error(JSON.stringify(response));
  }
  return response;
};  

export const fetchPostBegin = () => ({
  type: FETCH_POST_BEGIN
});

export const fetchPostSuccess = post => ({
  type: FETCH_POST_SUCCESS,
  post
});

export const fetchPostError = error => ({
  type: FETCH_POST_FAILURE,
  error
});

export function fetchPost(id) {
  return dispatch => {
    dispatch(fetchPostBegin());
    return getPost(id)
      .then(handleErrors)
      .then(res => { dispatch(fetchPostSuccess(res)); })
      .catch(error => dispatch(fetchPostError(error)))
  };
};