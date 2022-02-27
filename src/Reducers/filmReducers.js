import { 
  REVIEW_FILM_FAIL,
  REVIEW_FILM_REQUEST,
  REVIEW_FILM_SUCCESS,
  LIKE_FILM_FAIL,
  LIKE_FILM_REQUEST,
  LIKE_FILM_SUCCESS,
  FILM_DELETE_FAIL,
  FILM_DELETE_REQUEST,
  FILM_DELETE_SUCCESS,
  FILM_DETAILS_FAIL,
  FILM_DETAILS_REQUEST,
  FILM_DETAILS_SUCCESS,
  FILM_LIST_FAIL,
  FILM_LIST_REQUEST,
  FILM_LIST_SUCCESS,
  VIEWS_FILM_FAIL,
  VIEWS_FILM_REQUEST,
  VIEWS_FILM_SUCCESS,
  UNLIKE_FILM_REQUEST,
  UNLIKE_FILM_SUCCESS,
  UNLIKE_FILM_FAIL,
  FILM_UPDATE_REQUEST,
  FILM_UPDATE_SUCCESS,
  FILM_UPDATE_FAIL,
  FILM_DELETE_RESET,
  FILM_UPDATE_RESET,
  FILM_PARAMS_REQUEST,
  FILM_PARAMS_SUCCESS,
  FILM_PARAMS_FAIL,
  FILM_FLAG_REQUEST,
  FILM_FLAG_SUCCESS,
  FILM_FLAG_FAIL, 
} from "../Constants/filmConstants";

function filmListAllReducer(state = {allFilms:[]}, action) {
  switch (action.type) {
    case FILM_LIST_REQUEST:
      return { loading: true };
    case FILM_LIST_SUCCESS:
      return { loading: false, allFilms: action.payload };
    case FILM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function filmDetailsReducer(state = {}, action) {
switch (action.type) {
  case FILM_DETAILS_REQUEST:
  return { loading: true };
  case FILM_DETAILS_SUCCESS:
  return { loading: false, film: action.payload };
  case FILM_DETAILS_FAIL:
  return { loading: false, error: action.payload };
  default: return state;
}
}

function filmDeleteReducer(state = { film: {} }, action) {
  switch (action.type) {
    case FILM_DELETE_REQUEST:
      return { loading: true };
    case FILM_DELETE_SUCCESS:
      return { loading: false, film: action.payload, success: true };
    case FILM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case FILM_DELETE_RESET:
      return {};
    default:
      return state;
  }
}

function filmLikeReducer(state = { film: {} }, action) {
  switch (action.type) {
    case LIKE_FILM_REQUEST:
      return { loading: true };
    case LIKE_FILM_SUCCESS:
      return { ...state, loading: false, film: action.payload, success: true };
    case LIKE_FILM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function filmUnlikeReducer(state = { film: {} }, action) {
  switch (action.type) {
    case UNLIKE_FILM_REQUEST:
      return { loading: true };
    case UNLIKE_FILM_SUCCESS:
      return { ...state, loading: false, film: action.payload, success: true };
    case UNLIKE_FILM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// film flag
function filmFlagReducer (state = { video: {} }, action) {
  switch(action.type){
    case FILM_FLAG_REQUEST:
      return { loading: true };
    case FILM_FLAG_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true }; 
    case FILM_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


function filmViewReducer(state = { film: {} }, action) {
  switch (action.type) {
    case VIEWS_FILM_REQUEST:
      return { loading: true };
    case VIEWS_FILM_SUCCESS:
      return { loading: false, film: action.payload, success: true };
    case VIEWS_FILM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function filmReviewReducer(state = { film: {} }, action) {
  switch (action.type) {
    case REVIEW_FILM_REQUEST:
      return { loading: true };
    case REVIEW_FILM_SUCCESS:
      return { loading: false, film: action.payload, success: true };
    case REVIEW_FILM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



function filmUpdateReducer(state = { film: {} }, action) {
  switch (action.type) {
    case FILM_UPDATE_REQUEST:
      return { loading: true };
    case FILM_UPDATE_SUCCESS:
      return { loading: false, film: action.payload, success: true };
    case FILM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FILM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}

function filmParamsReducer (state = {loading: false}, action) {
  switch (action.type) {
    case FILM_PARAMS_REQUEST:
      return {loading: true};
    case FILM_PARAMS_SUCCESS:
      return {loading: false, params: action.payload};
    case FILM_PARAMS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}




export {
  filmFlagReducer,
  filmParamsReducer,
  filmListAllReducer,
  filmDetailsReducer,
  filmDeleteReducer,
  filmLikeReducer,
  filmUnlikeReducer,
  filmReviewReducer,
  filmViewReducer,
  filmUpdateReducer 
};