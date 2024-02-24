import {
  GET_ALL_DOGS,
  GET_DETAIL_DOG,
  SEARCH_DOG,
  FILTER_U_ORDER,
  CLEAN_DOG,
  CHANGE_PAGE,
  SLICE_CHANGE,
  NUMBER,
  GET_ALL_TEMPERAMENTS
}
  from "./actions";

const initialState = {
  allDogs: [],
  dogName:[],
  filter_u_order: [],
  dogDetails: {},
  temperaments:[],
  paginaActual: 1,
  paginado: 0,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };
    case GET_DETAIL_DOG:
      return {
        ...state,
        dogDetails: action.payload,
        errors: {},
      };
    case SEARCH_DOG:
      return {
        ...state,
        dogName: action.payload,
        errors: {},
      };
      case FILTER_U_ORDER:
      return {
        ...state,
        filter_u_order: action.payload,
        errors: {},
      };

    case CLEAN_DOG:
      return {
        ...state,
        dogName: action.payload,
        errors: {},
      };
    case CHANGE_PAGE:
      return {
        ...state,
        paginaActual: action.payload,
      };
    case SLICE_CHANGE:
      return {
        ...state,
        paginado: action.payload,
      };
    case NUMBER:
      return {
        ...state,
        paginado: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }
    default:
      return state;
  }
};

export default rootReducer;
