const axios = require('axios');

const getDogs = async (req, res) => {
    try {
        const { name } = req.query
        const apiResponse = await axios("https://api.thedogapi.com/v1/breeds")
        const dogs = apiResponse.data
        if (name) {

            const apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
            const apiName = apiResponse.data;
            return res.status(200).json(apiName);
        }
        else {

            return res.status(200).json(dogs);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogs;
