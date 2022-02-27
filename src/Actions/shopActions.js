import Axios from 'axios';
import { 
  SHOP_CATEGORY_LIST_FAIL,
  SHOP_CATEGORY_LIST_REQUEST,
  SHOP_CATEGORY_LIST_SUCCESS,
  SHOP_CREATE_FAIL,
  SHOP_CREATE_REQUEST,
  SHOP_CREATE_SUCCESS,
  SHOP_DELETE_FAIL,
  SHOP_DELETE_REQUEST,
  SHOP_DELETE_SUCCESS,
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_FLAG_FAIL,
  SHOP_FLAG_REQUEST,
  SHOP_FLAG_SUCCESS,
  SHOP_ITEMS_FAIL,
  SHOP_ITEMS_REQUEST,
  SHOP_ITEMS_SUCCESS,
  SHOP_LIKE_FAIL,
  SHOP_LIKE_REQUEST,
  SHOP_LIKE_SUCCESS,
  SHOP_LIST_FAIL, 
  SHOP_LIST_REQUEST, 
  SHOP_LIST_SUCCESS, 
  SHOP_REVIEW_CREATE_FAIL, 
  SHOP_REVIEW_CREATE_REQUEST, 
  SHOP_REVIEW_CREATE_SUCCESS, 
  SHOP_PARAMS_FAIL, 
  SHOP_PARAMS_REQUEST, 
  SHOP_PARAMS_SUCCESS, 
  SHOP_UNLIKE_FAIL, 
  SHOP_UNLIKE_REQUEST, 
  SHOP_UNLIKE_SUCCESS, 
  SHOP_UPDATE_FAIL, 
  SHOP_UPDATE_REQUEST,
  SHOP_UPDATE_SUCCESS,
  SHOP_ITEM_DELETE_FAIL,
  SHOP_ITEM_DELETE_REQUEST,
  SHOP_ITEM_DELETE_SUCCESS,
  SHOP_PIN_DETAILS_FAIL,
  SHOP_PIN_DETAILS_REQUEST,
  SHOP_PIN_DETAILS_SUCCESS
} from '../Constants/shopConstants';



//shop list 

export const listShops = ({
  pageNumber = '',
  ally = '',
  name = '',
  shopCategory = '',
  request = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: SHOP_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get(
      `/api/shops?pageNumber=${pageNumber}&ally=${ally}&name=${name}&category=${shopCategory}&min=${min}&max=${max}&rating=${rating}&request=${request}`);
    dispatch({
      type: SHOP_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SHOP_LIST_FAIL,
      payload: error.message
    });
  }
};

// shop categories

export const listShopCategories = () => async (dispatch) => {
  dispatch({
    type: SHOP_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/shops/categories');
    dispatch({
      type: SHOP_CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SHOP_CATEGORY_LIST_FAIL,
      payload: error.message
    });
  }
};

// shop details

export const detailsShop = (shopId) => async (dispatch) => {
  dispatch({ type: SHOP_DETAILS_REQUEST, payload: shopId });
  try {
    const { data } = await Axios.get(`/api/shops/${shopId}`);
    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// shop pin details
export const getShopPinDetails = (shopId) => async (dispatch) => {
  dispatch({
    type: SHOP_PIN_DETAILS_REQUEST,
    payload: shopId
  });
  try {
    const {data} = await Axios.get(`/api/shops/${shopId}/pin`);
    dispatch({
      type: SHOP_PIN_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SHOP_PIN_DETAILS_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
}


// shop create
export const createShop = () => async (dispatch, getState) => {
  dispatch({
    type: SHOP_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post('/api/shops', {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: SHOP_CREATE_SUCCESS,
      payload: data.shop,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOP_CREATE_FAIL,
      payload: message
    });
  }
};

// shop Edit

export const updateShop = (shop) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_UPDATE_REQUEST,
    payload: shop
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/shops/${shop._id}`, shop, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: SHOP_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOP_UPDATE_FAIL,
      error: message
    });
  }
};

// shop delete

export const deleteShop = (shopId) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_DELETE_REQUEST,
    payload: shopId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`/api/shops/${shopId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: SHOP_DELETE_SUCCESS });
    console.log({data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOP_DELETE_FAIL,
      payload: message
    });
  }
};

// shop review create

export const createReview = (shopId, review) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_REVIEW_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`/api/shops/${shopId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: SHOP_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOP_REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};


// shop item list

export const shopItemsList = (shopId) => async (dispatch, getState) => {
  dispatch({ type: SHOP_ITEMS_REQUEST, payload: shopId });
  const { userSignin: { userInfo } } = getState();
  console.log("shop video list found");

  try {
    const { data } = await Axios.get(`/api/shops/${shopId}/myitems`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: SHOP_ITEMS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOP_ITEMS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// delete item shop
export const deleteShopItem = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_ITEM_DELETE_REQUEST,
    payload: itemId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const {data} = await Axios.delete(`/api/shops/${itemId}/deleteItem`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: SHOP_ITEM_DELETE_SUCCESS,
      success: true,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: SHOP_ITEM_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}




// shop like
export const likeShop = (shopId) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_LIKE_REQUEST,
    payload: shopId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('shop Id founds')
  try {
    const { data } = await Axios.post(`/api/shops/${shopId}/likeShop/${interaction}`, {shopId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: SHOP_LIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOP_LIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// shop unlike

export const unlikeShop = (shopId) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_UNLIKE_REQUEST,
    payload: shopId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('shop Id found')
  try {
    const { data } = await Axios.delete(`/api/shops/${shopId}/likeChannnel`, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type: SHOP_UNLIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOP_UNLIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// shop flag
export const flagShop = (shopId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: SHOP_FLAG_REQUEST,
    payload: shopId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('shop Id founds')
  try {
    const { data } = await Axios.post(`/api/shops/${shopId}/flagShop/${interaction}`, {shopId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: SHOP_FLAG_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOP_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// shop params
export const getShopParams = (shopId) => async (dispatch) => {
  dispatch({
    type: SHOP_PARAMS_REQUEST,
    payload: shopId
  });
  try {
    const { data } = await Axios.get(`/api/shops/${shopId}/shopParams`);
    dispatch({
      type: SHOP_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SHOP_PARAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}