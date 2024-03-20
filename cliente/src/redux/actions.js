import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_DETAIL_DOG = 'GET_DETAIL_DOG'
export const SEARCH_DOG = 'SEARCH_DOG'
export const FILTER = 'FILTER'
export const CLEAN_DOG = 'CLEAN_DOG'
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const INI = 'INI';
export const SLICE_CHANGE = 'SLICE_CHANGE';
export const SIGUIENTE = 'SIGUIENTE';
export const ATRAS ='ATRAS';

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
    const respuesta = !name ? null : dog

    dispatch({
      type: SEARCH_DOG,
      payload: respuesta
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};

export const filters = (dogs, temperamento, origin, tipo, ascDesc) => async (dispatch) => {
  try {
    let temp = null
    let filtered = null
    if (temperamento || origin) {
      filtered = dogs.filter((dog) => {
        if (origin === "api") {
          temp = dog.temperament
        } else if (origin === "bd") {
          temp =  dog.temperaments && dog.temperaments?.length > 0 && dog.temperaments[0]?.name// && dog.temperaments.map(name => name.name).join(", ")
        } else {
          temp = dog.temperament || (dog.temperaments && dog.temperaments.length > 0 && dog.temperaments[0]?.name);
        }
        return temp && temp.includes(temperamento);
      });
    } else {
      if (tipo === "nombre") {
        filtered = dogs?.slice().sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (ascDesc === "asc") {
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
          }
          if (ascDesc === "desc") {
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
          }
          return 0;
        })
      }
      if (tipo === "peso") {
        filtered = dogs.slice().sort((a, b) => {
          let weightA = a.weight?.metric || a.weight
          let weightB = b.weight?.metric || b.weight

          const pesoA = parseFloat(weightA.split(" - ")[0]);
          const pesoB = parseFloat(weightB.split(" - ")[0]);
          if (ascDesc === "asc") {
            return pesoA - pesoB
          }
          if (ascDesc === "desc") {
            return pesoB - pesoA;
          }
          return 0;

        });
      }
    }


    dispatch({
      type: FILTER,
      payload: filtered
    });
  } catch (error) {
    console.error('Error fetching character:', error);
  }
};


export const clean = () => (dispatch) => {
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
export const inicio = () => (dispatch) => {
  dispatch({
    type: INI,
    payload: 0
  })
}
export const sliceMas = (paginado) => (dispatch) => {
  dispatch({
    type: SLICE_CHANGE,
    payload: paginado + 8
  })
}

export const sliceMenos = (ejemplo) => (dispatch) => {
  dispatch({
    type: SLICE_CHANGE,
    payload: ejemplo - 8
  })
}

export const next = (trueorfalse) => (dispatch) => {
  dispatch({
    type: SIGUIENTE,
    payload: trueorfalse
  })
}
export const preview = (trueorfalse) => (dispatch) => {
  dispatch({
    type: ATRAS,
    payload: trueorfalse
  })
}
