import axios from 'axios';
import { 
  ITEM_DELETE_FAIL,
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
  VIEWS_ITEM_SUCCESS, 
} from '../Constants/itemConstants';



// list all items

const listAllItems = () => async (dispatch) => {
  dispatch({ type: ITEM_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/items/");
    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


// item details

const itemDetails = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });
    const { data } = await axios.get('/api/items/' + itemId);
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// delete item

const deleteItem = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: ITEM_DELETE_REQUEST,
    payload: itemId
  });
  const { userSignin: { userInfo } } = getState();
  try {

    const { data } = await axios.delete('/api/items/' + itemId, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: ITEM_DELETE_SUCCESS,
      success: true,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// like item

const likeItem = (itemId) => async (dispatch, getState) => {
  console.log(itemId);
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: LIKE_ITEM_REQUEST, payload: itemId });
    const { data } = await axios.post(`/api/items/like/${itemId}`, { itemId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: LIKE_ITEM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: LIKE_ITEM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// unlike item

const unlikeItem = (itemId) => async (dispatch, getState) => {
  console.log(itemId);
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: UNLIKE_ITEM_REQUEST, payload: itemId });
    const { data } = await axios.delete(`/api/items/like/${itemId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: UNLIKE_ITEM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: UNLIKE_ITEM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// view item

const viewItem = (itemId) => async (dispatch, getState) => {
  console.log(itemId);
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: VIEWS_ITEM_REQUEST, payload: itemId });
    const { data } = await axios.post(`/api/items/view/${itemId}`, { itemId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: VIEWS_ITEM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: VIEWS_ITEM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// review item

const reviewItem = (itemId, review) => async (dispatch, getState) => {
  console.log(itemId);
  const { userSignin: { userInfo } } = getState();

  try {
    dispatch({ type: REVIEW_ITEM_REQUEST, payload: itemId });
    const { data } = await axios.post(`/api/items/${itemId}/reviews`, review , {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: REVIEW_ITEM_SUCCESS, payload: data.review, success: true });
  } catch (error) {
    dispatch({
      type: REVIEW_ITEM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// update item

const updateItem = (item) => async (dispatch, getState) => {
  dispatch({
    type: ITEM_UPDATE_REQUEST,
    payload: item
  });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await axios.put(`/api/items/${item._id}`, item, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: ITEM_UPDATE_SUCCESS, 
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_UPDATE_FAIL,
      error: message
    });
  };
};




export { listAllItems, itemDetails, deleteItem, likeItem, unlikeItem, reviewItem, viewItem, updateItem };