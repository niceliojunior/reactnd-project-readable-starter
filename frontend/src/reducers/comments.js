import { 
    FETCH_COMMENTS_BY_POST_BEGIN,
    FETCH_COMMENTS_BY_POST_SUCCESS, 
    FETCH_COMMENTS_BY_POST_FAILURE
  } from '../actions/comments';
  
  const initialState = {
    items: [],
    error: null,
  };
    
  export function comments(state = initialState, action) {
    switch(action.type) {
        case FETCH_COMMENTS_BY_POST_BEGIN:
        return {
          ...state,
          error: null,
        };
      
      case FETCH_COMMENTS_BY_POST_SUCCESS:
        return {
          ...state,
          items: action.comments,
        };
  
      case FETCH_COMMENTS_BY_POST_FAILURE:
        return {
          ...state,
          error: action.error,
          items: [],
        };
  
      default:
        return state;
    }
  }