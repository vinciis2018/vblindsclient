import {
 
  ASSET_CATEGORY_LIST_FAIL,
  ASSET_CATEGORY_LIST_REQUEST,
  ASSET_CATEGORY_LIST_SUCCESS,
  ASSET_CREATE_FAIL,
  ASSET_CREATE_REQUEST,
  ASSET_CREATE_RESET,
  ASSET_CREATE_SUCCESS,
  ASSET_SCREEN_CREATE_FAIL,
  ASSET_SCREEN_CREATE_REQUEST,
  ASSET_SCREEN_CREATE_RESET,
  ASSET_SCREEN_CREATE_SUCCESS,
  ASSET_DELETE_FAIL,
  ASSET_DELETE_REQUEST,
  ASSET_DELETE_RESET,
  ASSET_DELETE_SUCCESS,
  ASSET_DETAILS_FAIL,
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_SUCCESS,
  ASSET_LIKE_FAIL,
  ASSET_LIKE_REQUEST,
  ASSET_LIKE_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_REVIEW_CREATE_FAIL,
  ASSET_REVIEW_CREATE_REQUEST,
  ASSET_REVIEW_CREATE_RESET,
  ASSET_REVIEW_CREATE_SUCCESS,
  ASSET_UNLIKE_FAIL,
  ASSET_UNLIKE_REQUEST,
  ASSET_UNLIKE_SUCCESS,
  ASSET_FLAG_FAIL,
  ASSET_FLAG_REQUEST,
  ASSET_FLAG_SUCCESS,
  ASSET_UPDATE_FAIL,
  ASSET_UPDATE_REQUEST,
  ASSET_UPDATE_RESET,
  ASSET_UPDATE_SUCCESS,
  ASSET_SCREENS_FAIL,
  ASSET_SCREENS_REQUEST,
  ASSET_SCREENS_SUCCESS,
  ASSET_PARAMS_FAIL,
  ASSET_PARAMS_REQUEST,
  ASSET_PARAMS_SUCCESS
} from "../Constants/assetConstants";

export const assetListReducer = (state = { loading: true, assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true };
    case ASSET_LIST_SUCCESS:
      return {
        loading: false,
        assets: action.payload.assets,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ASSET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const assetCategoryListReducer = (state = { loading: true, assets: [] }, action) => {
  switch (action.type) {
    case ASSET_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case ASSET_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case ASSET_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ASSET_DETAILS_REQUEST:
      return { loading: true };
    case ASSET_DETAILS_SUCCESS:
      return { loading: false, asset: action.payload };
    case ASSET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_CREATE_REQUEST:
      return { loading: true };
    case ASSET_CREATE_SUCCESS:
      return { loading: false, success: true, asset: action.payload };
    case ASSET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetScreenCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_SCREEN_CREATE_REQUEST:
      return { loading: true };
    case ASSET_SCREEN_CREATE_SUCCESS:
      return { loading: false, success: true, screen: action.payload };
    case ASSET_SCREEN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_SCREEN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_UPDATE_REQUEST:
      return { loading: true };
    case ASSET_UPDATE_SUCCESS:
      return { loading: false, success: true};
    case ASSET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_DELETE_REQUEST:
      return { loading: true };
    case ASSET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ASSET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case ASSET_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case ASSET_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// asset screens get

function assetScreensReducer (state = { screens: [] }, action) {
  switch (action.type) {
    case ASSET_SCREENS_REQUEST:
      return { loading: true };
    case ASSET_SCREENS_SUCCESS:
      return { loading: false, screens: action.payload };
    case ASSET_SCREENS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// asset like

function assetLikeReducer (state = { asset: {} }, action) {
  switch(action.type){
    case ASSET_LIKE_REQUEST:
      return { loading: true };
    case ASSET_LIKE_SUCCESS:
      return { ...state, loading: false, asset: action.payload, success: true }; 
    case ASSET_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// asset unlike

function assetUnlikeReducer (state = { asset: {} }, action) {
  switch(action.type){
    case ASSET_UNLIKE_REQUEST:
      return { loading: true };
    case ASSET_UNLIKE_SUCCESS:
      return { ...state, loading: false, asset: action.payload, success: true }; 
    case ASSET_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// asset flag
function assetFlagReducer (state = { asset: {} }, action) {
  switch(action.type){
    case ASSET_FLAG_REQUEST:
      return { loading: true };
    case ASSET_FLAG_SUCCESS:
      return { ...state, loading: false, asset: action.payload, success: true }; 
    case ASSET_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// asset params
function assetParamsReducer (state = { loading: true }, action) {
  switch (action.type) {
    case ASSET_PARAMS_REQUEST:
      return { loading:true };
    case ASSET_PARAMS_SUCCESS:
      return { loading:false, params: action.payload };
    case ASSET_PARAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export { 
  assetParamsReducer,
  assetScreensReducer,
  assetLikeReducer, 
  assetUnlikeReducer,
  assetFlagReducer
};
