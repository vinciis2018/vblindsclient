import axios from 'axios';
import { 
  PIN_ADD_FAIL,
  PIN_ADD_REQUEST,
  PIN_ADD_SUCCESS,
  PIN_UPDATE_SUCCESS,
  PIN_UPDATE_REQUEST,
  PIN_UPDATE_FAIL,
  PIN_GET_FAIL,
  PIN_GET_REQUEST, 
  PIN_GET_SUCCESS 
} from '../Constants/pinConstants';

export const getAllPins = () => async(dispatch) => {
  dispatch({
    type: PIN_GET_REQUEST,
  })

  try {
    const {data} = await axios.get('api/pins');
    dispatch({
      type: PIN_GET_SUCCESS,
      payload: data
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: PIN_GET_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}





export const addPins = (category, lat, lon) => async(dispatch, getState) => {
  dispatch({
    type: PIN_ADD_REQUEST,
    payload: category, lat, lon

  })
  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await axios.post('/api/pins', {category, lat, lon}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PIN_ADD_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PIN_ADD_FAIL,
      payload: message
    });
  }
}



export const updatePin = (screenId, pin) => async (dispatch, getState) => {
  dispatch({
    type: PIN_UPDATE_REQUEST,
    payload: screenId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const {data} = await axios.put(`/api/pins/${screenId}`, pin, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    dispatch({
      type: PIN_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    
    dispatch({
      type: PIN_UPDATE_FAIL,
      error: message
    });
  }
};
