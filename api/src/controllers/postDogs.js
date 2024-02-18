const { Dog, Temperaments } = require('../db');

const postDogs = async (req, res) => {
    const {
        imagen,
        name,
        height,
        weight,
        life_span,
        temperament
    } = req.body;


    try {


        const existingPokemon = await Dog.findOne({
            where: {
                name: name
            }
        });

        // Si ya existe, enviar un mensaje de error
        if (existingPokemon) {
            return res.status(400).json({
                error: 'Ya existe un Perro con ese nombre.'
            });
        }

        // Si no existe, crear el nuevo Pokémon
        const newPokemon = await Dog.create({
            imagen,
            name,
            height,
            weight,
            life_span,
        });

        const temperamentsToAssociate = await Temperaments.findAll({
            where: {
                name: temperament
            }
        });

       
        await newPokemon.setTemperaments(temperamentsToAssociate);

        res.status(200).json(newPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al crear el nuevo Perro'
        });
    }
};

module.exports = postDogs;