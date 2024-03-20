import {
  GET_ALL_DOGS,
  GET_DETAIL_DOG,
  SEARCH_DOG,
  FILTER,
  CLEAN_DOG,
  CHANGE_PAGE,
  INI,
  SLICE_CHANGE,
  GET_ALL_TEMPERAMENTS,
  SIGUIENTE,
  ATRAS
}
  from "./actions";

const initialState = {
  allDogs: [],
  dogName: [],
  filter: [],
  dogDetails: {},
  temperaments: [],
  paginaActual: 1,
  paginado: 0,
  siguiente: true,
  atras: false,
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
    case FILTER:
      return {
        ...state,
        filter: action.payload,
        errors: {},
      };

    case CLEAN_DOG:
      return {
        ...state,
        dogName: action.payload,
        filter: action.payload,
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
    case INI:
      return {
        ...state,
        paginado: action.payload,
      };

    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    case SIGUIENTE:
      return {
        ...state,
        siguiente: action.payload
      }

    case ATRAS:
      return {
        ...state,
        atras: action.payload
      }
    
    default:
      return state;
  }
};

export default rootReducer;
