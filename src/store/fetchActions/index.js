import AuthService from '../../network/services/auth-service';
import NaverService from '../../network/services/naver-service';

import { addNaver, addNavers, setNaver, delNaver } from '../ducks/navers';
import { toggleLoading } from '../ducks/system';
import { login } from '../ducks/auth';

export const getAllNavers = () => {
  return async dispatch => {
    try {
      dispatch(toggleLoading());
      const { data } = await NaverService.index();
      dispatch(addNavers(data));
      dispatch(toggleLoading());
    } catch (error) {
      dispatch(toggleLoading());
      console.log(error);
    }
  };
};

export const showNaver = payload => {
  return async dispatch => {
    try {
      dispatch(toggleLoading());
      const { data } = await NaverService.show(payload);
      dispatch(setNaver(data));
      dispatch(toggleLoading());
      return data
    } catch (error) {
      dispatch(toggleLoading());
      console.log(error);
    }
  };
};

export const deleteNaver = payload => {
  return async dispatch => {
    try {
      dispatch(toggleLoading());
      dispatch(delNaver(payload));
      await NaverService.delete(payload);
      dispatch(toggleLoading());
    } catch (error) {
      dispatch(toggleLoading());
      console.log(error);
    }
  };
};

export const updateNaver = payload => {
  return async dispatch => {
    try {
      dispatch(toggleLoading());
      await NaverService.update(payload);
      dispatch(toggleLoading());
    } catch (error) {
      dispatch(toggleLoading());
      console.log(error);
    }
  };
};


export const createNaver = payload => {
  return async dispatch => {
    try {
      dispatch(toggleLoading());
      const { data } = await NaverService.create(payload);
      dispatch(addNaver(data));
      dispatch(toggleLoading());
    } catch (error) {
      dispatch(toggleLoading());
      console.log(error);
    }
  };
};

export const authLogin = payload => {
  const successLogin = (dispatch, token) => {
    localStorage.setItem('token', token);
    dispatch(login());
    window.location.pathname = '/home';
  }

  return async dispatch => {
    try {
      dispatch(toggleLoading());
      const { data } = await AuthService.login(payload)
      successLogin(dispatch, data.token)
      dispatch(toggleLoading());
    } catch (err) {
      try {
        await AuthService.signUp(payload)
        const { data } = await AuthService.login(payload)
        successLogin(dispatch, data.token)
        dispatch(toggleLoading());
      } catch (error) {
        dispatch(toggleLoading());
        console.log(error)
      }
    }
  };
};