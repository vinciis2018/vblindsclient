import { 
  CHANNEL_CATEGORY_LIST_FAIL,
  CHANNEL_CATEGORY_LIST_REQUEST,
  CHANNEL_CATEGORY_LIST_SUCCESS,
  CHANNEL_CREATE_FAIL,
  CHANNEL_CREATE_REQUEST,
  CHANNEL_CREATE_RESET,
  CHANNEL_CREATE_SUCCESS,
  CHANNEL_DELETE_FAIL,
  CHANNEL_DELETE_REQUEST,
  CHANNEL_DELETE_RESET,
  CHANNEL_DELETE_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_SUBSCRIBE_FAIL,
  CHANNEL_SUBSCRIBE_REQUEST,
  CHANNEL_SUBSCRIBE_SUCCESS,
  CHANNEL_FILMS_FAIL,
  CHANNEL_FILMS_REQUEST,
  CHANNEL_FILMS_SUCCESS,
  CHANNEL_FILM_DELETE_FAIL,
  CHANNEL_FILM_DELETE_REQUEST,
  CHANNEL_FILM_DELETE_SUCCESS,
  CHANNEL_FILM_UPLOAD_FAIL,
  CHANNEL_FILM_UPLOAD_REQUEST,
  CHANNEL_FILM_UPLOAD_SUCCESS,
  CHANNEL_LIKE_FAIL,
  CHANNEL_LIKE_REQUEST,
  CHANNEL_LIKE_SUCCESS,
  CHANNEL_LIST_FAIL, 
  CHANNEL_LIST_REQUEST, 
  CHANNEL_LIST_SUCCESS, 
  CHANNEL_REVIEW_CREATE_FAIL, 
  CHANNEL_REVIEW_CREATE_REQUEST, 
  CHANNEL_REVIEW_CREATE_RESET, 
  CHANNEL_REVIEW_CREATE_SUCCESS, 
  CHANNEL_UNSUBSCRIBE_FAIL, 
  CHANNEL_UNSUBSCRIBE_REQUEST, 
  CHANNEL_UNSUBSCRIBE_SUCCESS, 
  CHANNEL_UNLIKE_FAIL, 
  CHANNEL_UNLIKE_REQUEST, 
  CHANNEL_UNLIKE_SUCCESS, 
  CHANNEL_UPDATE_FAIL, 
  CHANNEL_UPDATE_REQUEST,
  CHANNEL_UPDATE_RESET,
  CHANNEL_UPDATE_SUCCESS,
  CHANNEL_FLAG_FAIL, 
  CHANNEL_FLAG_REQUEST,
  CHANNEL_FLAG_SUCCESS,
  CHANNEL_PARAMS_FAIL,
  CHANNEL_PARAMS_REQUEST,
  CHANNEL_PARAMS_SUCCESS
} from "../Constants/channelConstants";


export const channelListReducer = (state = { loading: true, channels: [] }, action) => {
  switch (action.type) {
    case CHANNEL_LIST_REQUEST:
      return { loading: true };
    case CHANNEL_LIST_SUCCESS:
      return {
        loading: false,
        channels: action.payload.channels,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CHANNEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const channelCategoryListReducer = (state = { loading: true, channels: [] }, action) => {
  switch (action.type) {
    case CHANNEL_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CHANNEL_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CHANNEL_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_REQUEST:
      return { loading: true };
    case CHANNEL_DETAILS_SUCCESS:
      return { loading: false, channel: action.payload };
    case CHANNEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_CREATE_REQUEST:
      return { loading: true };
    case CHANNEL_CREATE_SUCCESS:
      return { loading: false, success: true, channel: action.payload };
    case CHANNEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const channelUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_UPDATE_REQUEST:
      return { loading: true };
    case CHANNEL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CHANNEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const channelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_DELETE_REQUEST:
      return { loading: true };
    case CHANNEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CHANNEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const channelReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case CHANNEL_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case CHANNEL_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


// channel films get

function channelFilmsReducer (state = { films: [] }, action) {
  switch (action.type) {
    case CHANNEL_FILMS_REQUEST:
      return { loading: true };
    case CHANNEL_FILMS_SUCCESS:
      return { loading: false, films: action.payload };
    case CHANNEL_FILMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// channel film upload

function channelFilmUploadReducer (state = {},action) {
  switch(action.type){
    case CHANNEL_FILM_UPLOAD_REQUEST:
      return {loading:true};
    case CHANNEL_FILM_UPLOAD_SUCCESS:
      return {loading:false, success: true, film:action.payload};
    case CHANNEL_FILM_UPLOAD_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}

// channel films deleted

function channelFilmDeleteReducer (state = {}, action) {
  switch (action.type) {
    case CHANNEL_FILM_DELETE_REQUEST:
      return { loading: true };
    case CHANNEL_FILM_DELETE_SUCCESS:
      return { loading: false, film: action.payload, success: true };
    case CHANNEL_FILM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// channel like

function channelLikeReducer (state = { channel: {} }, action) {
  switch(action.type){
    case CHANNEL_LIKE_REQUEST:
      return { loading: true };
    case CHANNEL_LIKE_SUCCESS:
      return { ...state, loading: false, channel: action.payload, success: true }; 
    case CHANNEL_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// channel unlike

function channelUnlikeReducer (state = { channel: {} }, action) {
  switch(action.type){
    case CHANNEL_UNLIKE_REQUEST:
      return { loading: true };
    case CHANNEL_UNLIKE_SUCCESS:
      return { ...state, loading: false, channel: action.payload, success: true }; 
    case CHANNEL_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// channel fan
function channelSubscribeReducer (state = { channel: {} }, action) {
  switch(action.type){
    case CHANNEL_SUBSCRIBE_REQUEST:
      return { loading: true };
    case CHANNEL_SUBSCRIBE_SUCCESS:
      return { ...state, loading: false, channel: action.payload, success: true }; 
    case CHANNEL_SUBSCRIBE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// channel unfan
function channelUnsubscribeReducer (state = { channel: {} }, action) {
  switch(action.type){
    case CHANNEL_UNSUBSCRIBE_REQUEST:
      return { loading: true };
    case CHANNEL_UNSUBSCRIBE_SUCCESS:
      return { ...state, loading: false, channel: action.payload, success: true }; 
    case CHANNEL_UNSUBSCRIBE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// channel flag
function channelFlagReducer (state = { channel: {} }, action) {
  switch(action.type){
    case CHANNEL_FLAG_REQUEST:
      return { loading: true };
    case CHANNEL_FLAG_SUCCESS:
      return { ...state, loading: false, channel: action.payload, success: true }; 
    case CHANNEL_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// channel params
function channelParamsReducer (state = { loading: true }, action) {
  switch (action.type) {
    case CHANNEL_PARAMS_REQUEST:
      return { loading:true };
    case CHANNEL_PARAMS_SUCCESS:
      return { loading:false, params: action.payload };
    case CHANNEL_PARAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { 
  channelFlagReducer,
  channelParamsReducer,
  channelFilmsReducer, 
  channelFilmUploadReducer, 
  channelFilmDeleteReducer, 
  channelLikeReducer, 
  channelUnlikeReducer,
  channelSubscribeReducer,
  channelUnsubscribeReducer
};
