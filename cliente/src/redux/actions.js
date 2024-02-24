import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_DETAIL_DOG = 'GET_DETAIL_DOG'
export const SEARCH_DOG = 'SEARCH_DOG'
export const FILTER_U_ORDER = 'FILTER_U_ORDER'
export const CLEAN_DOG = 'CLEAN_DOG'
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SLICE_CHANGE = 'SLICE_CHANGE';
export const NUMBER = 'NUMBER';

export const fetchDogs = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs`);
    const dogs = response.data;
    dispatch({
      type: GET_ALL_DOGS,
      payload: dogs,
    });
  } catch (error) {
    console.log('Error fetching pokemons:', error);
  }
};


export const fetchTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/temperaments`);
    const temperaments = response.data;
    dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: temperaments,
    });
  } catch (error) {
    alert('Error fetching temperament:', error);
  }
};

export const fetchCharacter = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs/${id}`);
    const character = response.data;
    dispatch({
      type: GET_DETAIL_DOG,
      payload: character,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};

export const searchDog = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    const dog = response.data;

    dispatch({
      type: SEARCH_DOG,
      payload: dog,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};
export const filter = () => async (dispatch) => {
  try {
    

    dispatch({
      type: FILTER_U_ORDER,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};
export const order = () => async (dispatch) => {
  try {
    

    dispatch({
      type: FILTER_U_ORDER,
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};
export const cleanSearch = () => (dispatch) => {
  const vacio = []
  dispatch({
    type: CLEAN_DOG,
    payload: vacio,
  });
}
export const changePage = (pagina, num) => (dispatch) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: pagina + num
  })
}
export const sliceMas = (ejemplo) => (dispatch) => {
  dispatch({
    type: SLICE_CHANGE,
    payload: ejemplo + 8
  })
}

export const sliceMenos = (ejemplo) => (dispatch) => {
  dispatch({
    type: SLICE_CHANGE,
    payload: ejemplo - 8
  })
}

export const primer8 = (cuantos) => (dispatch) => {
  dispatch({
    type: NUMBER,
    payload: cuantos
  })
}
export const mas24 = (paginaActual) => (dispatch) => {
  dispatch({
    type: SLICE_CHANGE,
    payload: 24*paginaActual
  })
}
