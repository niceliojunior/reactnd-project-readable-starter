import { 
    FETCH_POST_BEGIN,
    FETCH_POST_SUCCESS, 
    FETCH_POST_FAILURE
  } from '../actions/post';
  
  const initialState = {
    item: {},
    error: null,
  };
    
  export function post(state = initialState, action) {
    switch(action.type) {
      case FETCH_POST_BEGIN:
        return {
          ...state,
          error: null,
        };
      
      case FETCH_POST_SUCCESS:
        return {
          ...state,
          item: action.post,
        };
  
      case FETCH_POST_FAILURE:
        return {
          ...state,
          error: action.error,
          item: {},
        };
  
      default:
        return state;
    }
  }