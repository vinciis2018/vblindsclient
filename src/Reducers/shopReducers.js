import { 
  SHOP_PARAMS_FAIL,
  SHOP_PARAMS_REQUEST,
  SHOP_PARAMS_SUCCESS,
  SHOP_CATEGORY_LIST_FAIL, 
  SHOP_CATEGORY_LIST_REQUEST, 
  SHOP_CATEGORY_LIST_SUCCESS, 
  SHOP_CREATE_FAIL, 
  SHOP_CREATE_REQUEST, 
  SHOP_CREATE_RESET, 
  SHOP_CREATE_SUCCESS, 
  SHOP_DELETE_FAIL, 
  SHOP_DELETE_REQUEST, 
  SHOP_DELETE_RESET, 
  SHOP_DELETE_SUCCESS, 
  SHOP_DETAILS_FAIL, 
  SHOP_DETAILS_REQUEST, 
  SHOP_DETAILS_SUCCESS, 
  SHOP_ITEMS_FAIL, 
  SHOP_ITEMS_REQUEST, 
  SHOP_ITEMS_SUCCESS, 
  SHOP_ITEM_DELETE_FAIL, 
  SHOP_ITEM_DELETE_REQUEST, 
  SHOP_ITEM_DELETE_SUCCESS, 
  SHOP_ITEM_UPLOAD_FAIL, 
  SHOP_ITEM_UPLOAD_REQUEST, 
  SHOP_ITEM_UPLOAD_SUCCESS, 
  SHOP_LIKE_FAIL, 
  SHOP_LIKE_REQUEST, 
  SHOP_LIKE_SUCCESS, 
  SHOP_LIST_FAIL, 
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
  SHOP_REVIEW_CREATE_FAIL,
  SHOP_REVIEW_CREATE_REQUEST,
  SHOP_REVIEW_CREATE_RESET,
  SHOP_REVIEW_CREATE_SUCCESS,
  SHOP_FLAG_FAIL,
  SHOP_FLAG_REQUEST,
  SHOP_FLAG_SUCCESS,
  SHOP_UNLIKE_FAIL,
  SHOP_UNLIKE_REQUEST,
  SHOP_UNLIKE_SUCCESS,
  SHOP_UPDATE_FAIL,
  SHOP_UPDATE_REQUEST,
  SHOP_UPDATE_RESET,
  SHOP_UPDATE_SUCCESS,
  SHOP_PIN_DETAILS_REQUEST,
  SHOP_PIN_DETAILS_SUCCESS,
  SHOP_PIN_DETAILS_FAIL
} from "../Constants/shopConstants";


export const shopListReducer = (state = { loading: true, shops: [] }, action) => {
  switch (action.type) {
    case SHOP_LIST_REQUEST:
      return { loading: true };
    case SHOP_LIST_SUCCESS:
      return {
        loading: false,
        shops: action.payload.shops,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SHOP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const shopCategoryListReducer = (state = { loading: true, shops: [] }, action) => {
  switch (action.type) {
    case SHOP_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case SHOP_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case SHOP_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const shopDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true };
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shop: action.payload };
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const shopPinDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SHOP_PIN_DETAILS_REQUEST:
      return { loading: true };
    case SHOP_PIN_DETAILS_SUCCESS:
      return { loading: false, shopPin: action.payload };
    case SHOP_PIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const shopCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_CREATE_REQUEST:
      return { loading: true };
    case SHOP_CREATE_SUCCESS:
      return { loading: false, success: true, shop: action.payload };
    case SHOP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SHOP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const shopUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_UPDATE_REQUEST:
      return { loading: true };
    case SHOP_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SHOP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SHOP_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const shopDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_DELETE_REQUEST:
      return { loading: true };
    case SHOP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SHOP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SHOP_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const shopReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case SHOP_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case SHOP_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SHOP_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


// shop items get

function shopItemsReducer (state = { items: [] }, action) {
  switch (action.type) {
    case SHOP_ITEMS_REQUEST:
      return { loading: true };
    case SHOP_ITEMS_SUCCESS:
      return { loading: false, items: action.payload };
    case SHOP_ITEMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// shop item upload

function shopItemUploadReducer (state = {},action) {
  switch(action.type){
    case SHOP_ITEM_UPLOAD_REQUEST:
      return {loading:true};
    case SHOP_ITEM_UPLOAD_SUCCESS:
      return {loading:false, success: true, item:action.payload};
    case SHOP_ITEM_UPLOAD_FAIL:
      return {loading:false, error:action.payload};
    default:
      return state;
  }
}

// shop items deleted

function shopItemDeleteReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_ITEM_DELETE_REQUEST:
      return { loading: true };
    case SHOP_ITEM_DELETE_SUCCESS:
      return { loading: false, item: action.payload, success: true };
    case SHOP_ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// shop like

function shopLikeReducer (state = { shop: {} }, action) {
  switch(action.type){
    case SHOP_LIKE_REQUEST:
      return { loading: true };
    case SHOP_LIKE_SUCCESS:
      return { ...state, loading: false, shop: action.payload, success: true }; 
    case SHOP_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// shop unlike

function shopUnlikeReducer (state = { shop: {} }, action) {
  switch(action.type){
    case SHOP_UNLIKE_REQUEST:
      return { loading: true };
    case SHOP_UNLIKE_SUCCESS:
      return { ...state, loading: false, shop: action.payload, success: true }; 
    case SHOP_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// shop flag
function shopFlagReducer (state = { shop: {} }, action) {
  switch(action.type){
    case SHOP_FLAG_REQUEST:
      return { loading: true };
    case SHOP_FLAG_SUCCESS:
      return { ...state, loading: false, shop: action.payload, success: true }; 
    case SHOP_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function shopParamsReducer (state = {loading: true}, action) {
  switch (action.type) {
    case SHOP_PARAMS_REQUEST:
      return {loading:true};
    case SHOP_PARAMS_SUCCESS:
      return {loading:false, params: action.payload};
    case SHOP_PARAMS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}


export { 
  shopItemsReducer, 
  shopItemUploadReducer, 
  shopItemDeleteReducer, 
  shopLikeReducer, 
  shopUnlikeReducer,
  shopFlagReducer,
  shopParamsReducer
};
