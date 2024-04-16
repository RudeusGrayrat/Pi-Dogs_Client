const validateForm = (userData) => {
    const errors = {};

    if (!userData.name) {
        errors.name = 'El nombre es requerido.';
    }else if (!/^[a-zA-Z\s]+$/.test(userData.name)) {
        errors.name = 'El nombre no puede contener números.';
    }
    if (!userData.imagen) {
        errors.imagen = 'La Imagen es requerida.';
    }

    if (!userData.height) {
        errors.height = 'La altura es requerida.';
    }else {
        const [minHeight, maxHeight] = userData.height.split('-').map(value => parseInt(value.trim()));
        if (minHeight >= maxHeight) {
            errors.height = 'La altura mínima debe ser menor que la máxima.';
        }
    }

    if (!userData.weight) {
        errors.weight = 'El peso es requerido.';
    }else {
        const [minWeight, maxWeight] = userData.weight.split('-').map(value => parseInt(value.trim()));
        if (minWeight >= maxWeight) {
            errors.weight = 'El peso mínimo debe ser menor que el máximo.';
        }
    }

    if (!userData.life_span) {
        errors.life_span = 'Los años de vida son requeridos.';
    }

    return errors;
};

export default validateForm;
