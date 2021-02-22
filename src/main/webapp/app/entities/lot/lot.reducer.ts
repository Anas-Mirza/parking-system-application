import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILot, defaultValue } from 'app/shared/model/lot.model';

export const ACTION_TYPES = {
  FETCH_LOT_LIST: 'lot/FETCH_LOT_LIST',
  FETCH_LOT: 'lot/FETCH_LOT',
  CREATE_LOT: 'lot/CREATE_LOT',
  UPDATE_LOT: 'lot/UPDATE_LOT',
  DELETE_LOT: 'lot/DELETE_LOT',
  RESET: 'lot/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILot>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LotState = Readonly<typeof initialState>;

// Reducer

export default (state: LotState = initialState, action): LotState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LOT):
    case REQUEST(ACTION_TYPES.UPDATE_LOT):
    case REQUEST(ACTION_TYPES.DELETE_LOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOT):
    case FAILURE(ACTION_TYPES.CREATE_LOT):
    case FAILURE(ACTION_TYPES.UPDATE_LOT):
    case FAILURE(ACTION_TYPES.DELETE_LOT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOT):
    case SUCCESS(ACTION_TYPES.UPDATE_LOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/lots';

// Actions

export const getEntities: ICrudGetAllAction<ILot> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOT_LIST,
  payload: axios.get<ILot>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILot> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOT,
    payload: axios.get<ILot>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILot> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
