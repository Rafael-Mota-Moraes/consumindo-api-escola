import * as types from "../types";

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload: payload
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: payload
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload: payload
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload: payload
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload: payload
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload: payload
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload: payload
  };
}
