const { dogs, temperaments } = require('../db');

const postDogs = async (req, res) => {
    const {
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        types
    } = req.body;

    const ataqueNum = parseInt(ataque);
    const defensaNum = parseInt(defensa);
    try {

        const ataque = isNaN(ataqueNum) ? 0 : ataqueNum;
        const defensa = isNaN(defensaNum) ? 0 : defensaNum;
        // Verificar si ya existe un Pokémon con el mismo nombre
        const existingPokemon = await Pokemon.findOne({
            where: {
                name: name
            }
        });

        // Si ya existe, enviar un mensaje de error
        if (existingPokemon) {
            return res.status(400).json({
                error: 'Ya existe un Pokémon con ese nombre.'
            });
        }

        // Si no existe, crear el nuevo Pokémon
        const newPokemon = await Pokemon.create({
            name,
            image,
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso,
        });

        const typesToAssociate = await Type.findAll({
            where: {
                name: types  
            }
        });

        if (typesToAssociate.length < 2) {
            await newPokemon.destroy(); 
            return res.status(400).json({
                error: 'Se requieren al menos dos tipos para un Pokémon.'
            });
        }
        await newPokemon.setTypes(typesToAssociate);

        res.status(200).json(newPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al crear el nuevo Pokémon'
        });
    }
};

module.exports = postDogs;