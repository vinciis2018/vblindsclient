import axios from 'axios';
import { 
  FILM_DELETE_FAIL,
  FILM_DELETE_REQUEST,
  FILM_DELETE_SUCCESS,
  FILM_DETAILS_FAIL,
  FILM_DETAILS_REQUEST,
  FILM_DETAILS_SUCCESS,
  FILM_LIST_FAIL,
  FILM_LIST_REQUEST, 
  FILM_LIST_SUCCESS,
  FILM_PARAMS_FAIL,
  FILM_PARAMS_REQUEST,
  FILM_PARAMS_SUCCESS,
  FILM_UPDATE_FAIL,
  FILM_UPDATE_REQUEST,
  FILM_UPDATE_SUCCESS,
  LIKE_FILM_FAIL,
  LIKE_FILM_REQUEST,
  LIKE_FILM_SUCCESS,
  REVIEW_FILM_FAIL,
  REVIEW_FILM_REQUEST,
  REVIEW_FILM_SUCCESS,
  UNLIKE_FILM_FAIL,
  UNLIKE_FILM_REQUEST,
  UNLIKE_FILM_SUCCESS,
  VIEWS_FILM_FAIL,
  VIEWS_FILM_REQUEST,
  VIEWS_FILM_SUCCESS, 
} from '../Constants/filmConstants';



// list all films

const listAllFilms = () => async (dispatch) => {
  dispatch({ type: FILM_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/films/");
    dispatch({ type: FILM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FILM_LIST_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


// Film details

const getFilmDetails = (filmId) => async (dispatch) => {
  try {
    dispatch({ type: FILM_DETAILS_REQUEST });
    const { data } = await axios.get('/api/films/' + filmId);
    dispatch({ type: FILM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FILM_DETAILS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// delete Film

const deleteFilm = (filmId) => async (dispatch, getState) => {
  dispatch({
    type: FILM_DELETE_REQUEST,
    payload: filmId
  });
  const { userSignin: { userInfo } } = getState();
  try {

    const { data } = await axios.delete('/api/films/' + filmId, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: FILM_DELETE_SUCCESS,
      success: true,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: FILM_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// like Film

const likeFilm = (filmId, interaction) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: LIKE_FILM_REQUEST, payload: filmId });
    const { data } = await axios.post(`/api/films/${filmId}/likeFilm/${interaction}`, { filmId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: LIKE_FILM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: LIKE_FILM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// unlike Film

const unlikeFilm = (filmId) => async (dispatch, getState) => {
  console.log(filmId);
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: UNLIKE_FILM_REQUEST, payload: filmId });
    const { data } = await axios.delete(`/api/films/${filmId}/unlikeFilm`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: UNLIKE_FILM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: UNLIKE_FILM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// flag film
export const flagFilm = (filmId) => async (dispatch, getState) => {
  dispatch({
    type: FILM_FLAG_REQUEST,
    payload: filmId
  });
  const { userSignin: { userInfo } } = getState();
  console.log('film Id found')
  try {
    const { data } = await axios.post(`/api/films/${filmId}/flagFilm/${interaction}`, {filmId}, {
      headers:
        { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: FILM_FLAG_SUCCESS, payload: data, success: true })
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILM_FLAG_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};


// view Film
const viewFilm = (filmId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: VIEWS_FILM_REQUEST, payload: filmId });
    const { data } = await axios.post(`/api/films/view/${filmId}`, { filmId }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: VIEWS_FILM_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: VIEWS_FILM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// review film
const reviewFilm = (filmId, review) => async (dispatch, getState) => {
  console.log(filmId);
  const { userSignin: { userInfo } } = getState();

  try {
    dispatch({ type: REVIEW_FILM_REQUEST, payload: filmId });
    const { data } = await axios.post(`/api/films/${filmId}/reviews`, review , {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: REVIEW_FILM_SUCCESS, payload: data.review, success: true });
  } catch (error) {
    dispatch({
      type: REVIEW_FILM_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// update film

const updateFilm = (film) => async (dispatch, getState) => {
  dispatch({
    type: FILM_UPDATE_REQUEST,
    payload: film
  });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await axios.put(`/api/films/${film._id}`, film, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: FILM_UPDATE_SUCCESS, 
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FILM_UPDATE_FAIL,
      error: message
    });
  };
};


// get Film Params
const getFilmParams = (filmId) => async (dispatch) => {
  dispatch({
    type: FILM_PARAMS_REQUEST,
    payload: filmId
  });
  try {
    const {data} = await axios.get(`/api/films/${filmId}/params`);
    dispatch({
      type: FILM_PARAMS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: FILM_PARAMS_FAIL,
      error: message
    })
  }
}


export { 
  getFilmParams,
  listAllFilms, 
  getFilmDetails, 
  deleteFilm, 
  likeFilm, 
  unlikeFilm, 
  reviewFilm, 
  viewFilm, 
  updateFilm 
};