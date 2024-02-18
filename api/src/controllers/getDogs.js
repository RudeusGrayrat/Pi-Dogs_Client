const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temperaments } = require("../db");

const getDogs = async (req, res) => {
    try {
        const { name } = req.query;
        const { ini: startIdx, fin: endIdx } = req.query; 

        if (name) {
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&apy_key=${YOUR_API_KEY}`);
            const apiName = apiResponse.data;
            const dogName = apiName[0];
            const ob = await axios.get(`https://api.thedogapi.com/v1/images/${dogName.reference_image_id}?apy_key=${YOUR_API_KEY}`);
            const imagen = ob.data.url;
            dogName.imagen = imagen;
            if (Dog) {
                Dog.findOne({
                    include: {
                        model: Temperaments,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    },
                });
            }
            return res.status(200).json(apiName);
        } else {
            const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?apy_key=${YOUR_API_KEY}`);
            const dogs = apiResponse.data;
            const limite = dogs.slice(startIdx, endIdx ); 
            for (const dog of limite) {
                if (dog.reference_image_id) {
                    const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}?apy_key=${YOUR_API_KEY}`);
                    const imageUrl = imageResponse.data.url;
                    dog.imagen = imageUrl;
                }
            }
            return res.status(200).json(limite);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos de Pokémon' });
    }
};

module.exports = getDogs;
