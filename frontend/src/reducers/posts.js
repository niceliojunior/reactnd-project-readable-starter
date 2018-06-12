import { 
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS, 
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_BY_CATEGORY_BEGIN,
  FETCH_POSTS_BY_CATEGORY_SUCCESS, 
  FETCH_POSTS_BY_CATEGORY_FAILURE
} from '../actions/posts';

const initialState = {
  items: [],
  error: null,
};
  
export function posts(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        error: null,
      };
    
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        items: action.payload.posts,
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        items: [],
      };

      case FETCH_POSTS_BY_CATEGORY_BEGIN:
      return {
        ...state,
        error: null,
      };
    
    case FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload.posts,
      };

    case FETCH_POSTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        items: [],
      };

    default:
      return state;
  }
}