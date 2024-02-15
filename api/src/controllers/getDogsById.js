const axios = require('axios');
// const YOUR_API_KEY = process.env;

const getDogsById = async (req, res) => {
    try {
        const { idRaza } = req.params

        const apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
        const apiPokemon = apiResponse.data;
        return res.status(200).json(apiPokemon);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogsById;
