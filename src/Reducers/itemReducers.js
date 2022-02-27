import { 
  ITEM_DELETE_FAIL,
  ITEM_DELETE_RESET,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST, 
  ITEM_LIST_SUCCESS, 
  ITEM_UPDATE_FAIL, 
  ITEM_UPDATE_REQUEST, 
  ITEM_UPDATE_SUCCESS, 
  LIKE_ITEM_FAIL, 
  LIKE_ITEM_REQUEST, 
  LIKE_ITEM_SUCCESS, 
  REVIEW_ITEM_FAIL, 
  REVIEW_ITEM_REQUEST, 
  REVIEW_ITEM_SUCCESS, 
  UNLIKE_ITEM_FAIL, 
  UNLIKE_ITEM_REQUEST, 
  UNLIKE_ITEM_SUCCESS, 
  VIEWS_ITEM_FAIL, 
  VIEWS_ITEM_REQUEST,
  VIEWS_ITEM_SUCCESS
} from "../Constants/itemConstants";


function itemListAllReducer(state = {allItems:[]}, action) {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true };
    case ITEM_LIST_SUCCESS:
      return { loading: false, allItems: action.payload };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function itemDetailReducer(state = {}, action) {
switch (action.type) {
  case ITEM_DETAILS_REQUEST:
  return { loading: true };
  case ITEM_DETAILS_SUCCESS:
  return { loading: false, item: action.payload };
  case ITEM_DETAILS_FAIL:
  return { loading: false, error: action.payload };
  default: return state;
}
}

function itemDeleteReducer(state = { item: {} }, action) {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_DELETE_RESET:
      return {}
    default:
      return state;
  }
}

function itemLikeReducer(state = { item: {} }, action) {
  switch (action.type) {
    case LIKE_ITEM_REQUEST:
      return { loading: true };
    case LIKE_ITEM_SUCCESS:
      return { ...state, loading: false, item: action.payload, success: true };
    case LIKE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemUnlikeReducer(state = { item: {} }, action) {
  switch (action.type) {
    case UNLIKE_ITEM_REQUEST:
      return { loading: true };
    case UNLIKE_ITEM_SUCCESS:
      return { ...state, loading: false, item: action.payload, success: true };
    case UNLIKE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



function itemViewReducer(state = { item: {} }, action) {
  switch (action.type) {
    case VIEWS_ITEM_REQUEST:
      return { loading: true };
    case VIEWS_ITEM_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case VIEWS_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function itemReviewReducer(state = { item: {} }, action) {
  switch (action.type) {
    case REVIEW_ITEM_REQUEST:
      return { loading: true };
    case REVIEW_ITEM_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case REVIEW_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



function itemUpdateReducer(state = { item: {} }, action) {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}





export {
  itemListAllReducer,
  itemDetailReducer,
  itemDeleteReducer,
  itemLikeReducer,
  itemUnlikeReducer,
  itemReviewReducer,
  itemViewReducer,
  itemUpdateReducer 
};