import Axios from 'axios';
import { 
  CHANNEL_CATEGORY_LIST_FAIL,
  CHANNEL_CATEGORY_LIST_REQUEST,
  CHANNEL_CATEGORY_LIST_SUCCESS,
  CHANNEL_CREATE_FAIL,
  CHANNEL_CREATE_REQUEST,
  CHANNEL_CREATE_SUCCESS,
  CHANNEL_DELETE_FAIL,
  CHANNEL_DELETE_REQUEST,
  CHANNEL_DELETE_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_FAN_FAIL,
  CHANNEL_FAN_REQUEST,
  CHANNEL_FAN_SUCCESS,
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
  CHANNEL_REVIEW_CREATE_SUCCESS, 
  CHANNEL_UNFAN_FAIL, 
  CHANNEL_UNFAN_REQUEST, 
  CHANNEL_UNFAN_SUCCESS, 
  CHANNEL_UNLIKE_FAIL, 
  CHANNEL_UNLIKE_REQUEST, 
  CHANNEL_UNLIKE_SUCCESS, 
  CHANNEL_UPDATE_FAIL, 
  CHANNEL_UPDATE_REQUEST,
  CHANNEL_UPDATE_SUCCESS
} from '../Constants/channelConstants';



//channel list 

export const listChannels = ({
  pageNumber = '',
  ally = '',
  name = '',
  channelCategory = '',
  request = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: CHANNEL_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get(
      `/api/channels?pageNumber=${pageNumber}&ally=${ally}&name=${name}&category=${channelCategory}&min=${min}&max=${max}&rating=${rating}&request=${request}`);
    dispatch({
      type: CHANNEL_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_LIST_FAIL,
      payload: error.message
    });
  }
};

// channel categories

export const listChannelCategories = () => async (dispatch) => {
  dispatch({
    type: CHANNEL_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/channels/categories');
    dispatch({
      type: CHANNEL_CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_CATEGORY_LIST_FAIL,
      payload: error.message
    });
  }
};

// channel details

export const detailsChannel = (channelId) => async (dispatch) => {
  dispatch({ type: CHANNEL_DETAILS_REQUEST, payload: channelId });
  try {
    const { data } = await Axios.get(`/api/channels/${channelId}`);
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// channel create

export const createChannel = () => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post('/api/channels', {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: CHANNEL_CREATE_SUCCESS,
      payload: data.channel,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHANNEL_CREATE_FAIL,
      payload: message
    });
  }
};

// channel Edit

export const updateChannel = (channel) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_UPDATE_REQUEST,
    payload: channel
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/channels/${channel._id}`, channel, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: CHANNEL_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHANNEL_UPDATE_FAIL,
      error: message
    });
  }
};

// channel delete

export const deleteChannel = (channelId) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_DELETE_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`/api/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: CHANNEL_DELETE_SUCCESS });
    console.log({data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHANNEL_DELETE_FAIL,
      payload: message
    });
  }
};

// channel review create

export const createReview = (channelId, review) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_REVIEW_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`/api/channels/${channelId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CHANNEL_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHANNEL_REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};


// channel film list

export const channelFilmsList = (channelId) => async (dispatch, getState) => {
  dispatch({ type: CHANNEL_FILMS_REQUEST, payload: channelId });
  const { userSignin: { userInfo } } = getState();
  console.log("channel video list found");

  try {
    const { data } = await Axios.get(`/api/channels/${channelId}/myfilms`, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: CHANNEL_FILMS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_FILMS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// upload film channel 

export const channelFilmUpload = (channelId, film) => async (dispatch, getState) => {
  console.log("hello", channelId);
  try {
    dispatch({
      type: CHANNEL_FILM_UPLOAD_REQUEST,
    });
    const { userSignin: { userInfo } } = getState();
    if (!film._id) {
      const { data } = await Axios.post(`/api/channels/${channelId}/uploadFilm`,
        film,
        {
          headers: { Authorization: 'Bearer ' + userInfo.token },
        }
      )
      dispatch({ type: CHANNEL_FILM_UPLOAD_SUCCESS, payload: data.film });
    } else {
      const { data } = await Axios.put('/api/films/' + film._id, film, {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      }
      );
      dispatch({ type: CHANNEL_FILM_UPLOAD_SUCCESS, payload: data.film });
    }
  } catch (error) {
    dispatch({
      type: CHANNEL_FILM_UPLOAD_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }

};


// delete channel film

export const deleteChannelFilm = (filmId) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_FILM_DELETE_REQUEST,
    payload: filmId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const {data} = await Axios.delete(`/api/channels/${filmId}/deleteFilm`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: CHANNEL_FILM_DELETE_SUCCESS,
      success: true,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: CHANNEL_FILM_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}


// channel like
export const likeChannel = (channelId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_LIKE_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('channel Id founds')
  try {
    const { data } = await Axios.post(`/api/channels/${channelId}/likeChannel/${interaction}`, {channelId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: CHANNEL_LIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_LIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// channel unlike

export const unlikeChannel = (channelId) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_UNLIKE_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('channel Id found')
  try {
    const { data } = await Axios.delete(`/api/channels/${channelId}/likeChannnel`, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type: CHANNEL_UNLIKE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_UNLIKE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// channel subsribe

export const subscribeChannel = (channelId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_SUBSCRIBE_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('channel Id founds')
  try {
    const { data } = await Axios.post(`/api/channels/${channelId}/subscribeChannel/${interaction}`, {channelId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: CHANNEL_SUBSCRIBE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_SUBSCRIBE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// channel Unsubscribe
export const unsubscribeChannel = (channelId) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_UNSUBSCRIBE_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('channel Id found')
  try {
    const { data } = await Axios.delete(`/api/channels/${channelId}/subscribeChannel`, {
      headers:
        { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({ type: CHANNEL_UNSUBSCRIBE_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_UNSUBSCRIBE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// channel flag
export const flagChannel = (channelId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: CHANNEL_FLAG_REQUEST,
    payload: channelId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('channel Id founds')
  try {
    const { data } = await Axios.post(`/api/channels/${channelId}/flagChannel/${interaction}`, {channelId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: CHANNEL_FLAG_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// channel params
export const getChannelParams = (channelId) => async (dispatch) => {
  dispatch({
    type: CHANNEL_PARAMS_REQUEST,
    payload: channelId
  });
  // console.log(time)
  try {
    const { data } = await Axios.get(`/api/channels/${channelId}/channelParams`);
    dispatch({
      type: CHANNEL_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_PARAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

