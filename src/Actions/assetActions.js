import Axios from 'axios';

import {
  ASSET_CATEGORY_LIST_FAIL,
  ASSET_CATEGORY_LIST_REQUEST,
  ASSET_CATEGORY_LIST_SUCCESS,
  ASSET_CREATE_FAIL,
  ASSET_CREATE_REQUEST,
  ASSET_CREATE_SUCCESS,
  ASSET_SCREEN_CREATE_FAIL,
  ASSET_SCREEN_CREATE_REQUEST,
  ASSET_SCREEN_CREATE_SUCCESS,
  ASSET_DELETE_FAIL,
  ASSET_DELETE_REQUEST,
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
  ASSET_REVIEW_CREATE_SUCCESS,
  ASSET_UNLIKE_FAIL,
  ASSET_UNLIKE_REQUEST,
  ASSET_UNLIKE_SUCCESS,
  ASSET_FLAG_FAIL,
  ASSET_FLAG_REQUEST,
  ASSET_FLAG_SUCCESS,
  ASSET_UPDATE_FAIL,
  ASSET_UPDATE_REQUEST,
  ASSET_UPDATE_SUCCESS,
  ASSET_SCREENS_REQUEST,
  ASSET_SCREENS_SUCCESS,
  ASSET_SCREENS_FAIL,
  ASSET_PARAMS_REQUEST,
  ASSET_PARAMS_SUCCESS,
  ASSET_PARAMS_FAIL
} from '../Constants/assetConstants';


// // list top assets

// export const listTopMasters = () => async (dispatch) => {
//   dispatch({
//     type: TOPASSETS_LIST_REQUEST,
//   });
//   try {
//     const { data } = await axios.get('/api/users/top-masters');
//     dispatch({
//       type: TOPASSETS_LIST_SUCCESS,
//       payload: data
//     })
//   } catch (error) {
//     const message =
//     error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message;
//     dispatch({
//       type: TOPASSETS_LIST_FAIL,
//       payload: message 
//     });
//   }
// }


//asset list 

export const listAssets = ({
  pageNumber = '',
  master = '',
  name = '',
  assetCategory = '',
  request = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: ASSET_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get(
      `/api/assets?pageNumber=${pageNumber}&master=${master}&name=${name}&category=${assetCategory}&min=${min}&max=${max}&rating=${rating}&request=${request}`);
    dispatch({
      type: ASSET_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSET_LIST_FAIL,
      payload: error.message
    });
  }
};

// asset categories

export const listAssetCategories = () => async (dispatch) => {
  dispatch({
    type: ASSET_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/assets/categories');
    dispatch({
      type: ASSET_CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSET_CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// asset details

export const detailsAsset = (assetId) => async (dispatch) => {
  dispatch({ 
    type: ASSET_DETAILS_REQUEST, 
    payload: assetId 
  });
  try {
    const { data } = await Axios.get(`/api/assets/${assetId}`);
    dispatch({
      type: ASSET_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// asset create

export const createAsset = () => async (dispatch, getState) => {
  dispatch({
    type: ASSET_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post('/api/assets', {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: ASSET_CREATE_SUCCESS,
      payload: data.asset
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ASSET_CREATE_FAIL,
      payload: message
    });
  }
};


// asset screen create

export const createAssetScreen = (assetId) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_SCREEN_CREATE_REQUEST,
    payload: assetId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`/api/assets/${assetId}`, {assetId}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: ASSET_SCREEN_CREATE_SUCCESS,
      payload: data.screen
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ASSET_SCREEN_CREATE_FAIL,
      payload: message
    });
  }
};


// asset Edit

export const updateAsset = (asset) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_UPDATE_REQUEST,
    payload: asset
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/assets/${asset._id}`, asset, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: ASSET_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ASSET_UPDATE_FAIL,
      error: message
    });
  }
};

// asset delete

export const deleteAsset = (assetId) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_DELETE_REQUEST,
    payload: assetId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`/api/assets/${assetId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ASSET_DELETE_SUCCESS });
    console.log({data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ASSET_DELETE_FAIL,
      payload: message
    });
  }
};

// asset review create

export const createReview = (assetId, review) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_REVIEW_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`/api/assets/${assetId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: ASSET_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ASSET_REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};


// asset screen list

export const assetScreensList = (assetId) => async (dispatch, getState) => {
  dispatch({ type: ASSET_SCREENS_REQUEST, payload: assetId });
  const { userSignin: { userInfo } } = getState();
  console.log("asset screen list found");

  try {
    const { data } = await Axios.get(`/api/assets/${assetId}/myscreens`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ASSET_SCREENS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSET_SCREENS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// asset like
export const likeAsset = (assetId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_LIKE_REQUEST,
    payload: assetId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('asset Id founds')
  try {
    const { data } = await Axios.post(`/api/assets/${assetId}/likeAsset/${interaction}`, {assetId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ASSET_LIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSET_LIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// asset unlike

export const unlikeAsset = (assetId) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_UNLIKE_REQUEST,
    payload: assetId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('asset Id founds')
  try {
    const { data } = await Axios.delete(`/api/assets/${assetId}/likeAsset`, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type: ASSET_UNLIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSET_UNLIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// asset flag
export const flagAsset = (assetId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: ASSET_FLAG_REQUEST,
    payload: assetId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('screen Id founds')
  try {
    const { data } = await Axios.post(`/api/assets/${assetId}/flagAsset/${interaction}`, {assetId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ASSET_FLAG_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSET_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// asset params
export const getAssetParams = (assetId) => async (dispatch) => {
  dispatch({
    type: ASSET_PARAMS_REQUEST,
    payload: assetId
  });
  // console.log(time)
  try {
    const { data } = await Axios.get(`/api/assets/${assetId}/assetParams`);
    dispatch({
      type: ASSET_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ASSET_PARAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}



