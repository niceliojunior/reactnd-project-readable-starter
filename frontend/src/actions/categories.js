import { getCategories } from '../utils/api';

export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesBegin = () => ({
    type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
    type: FETCH_CATEGORIES_SUCCESS,
    categories
});

export const fetchCategoriesError = error => ({
    type: FETCH_CATEGORIES_FAILURE,
    error
});

function handleErrors(response) {
  if (!response.categories) {
    throw Error(response.statusText);
    //throw Error(JSON.stringify(response));
  }
  return response;
};

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return getCategories()
      .then(handleErrors)
      .then(res => { dispatch(fetchCategoriesSuccess(res.categories)); })
      .catch(error => dispatch(fetchCategoriesError(error)))
  };
};