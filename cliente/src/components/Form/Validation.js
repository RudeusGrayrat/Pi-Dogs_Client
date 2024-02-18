export default function validate(formData)  {
    const errors = [];
    if (!formData.name || !formData.image || !formData.vida || !formData.ataque || !formData.defensa) {
        errors.push('Todos los campos son obligatorios.');
    }
    if (isNaN(formData.vida) || isNaN(formData.ataque) || isNaN(formData.defensa) ||
        (formData.velocidad && isNaN(formData.velocidad)) || (formData.altura && isNaN(formData.altura)) ||
        (formData.peso && isNaN(formData.peso))) {
        errors.push('Los valores de Vida, Ataque, Defensa, Velocidad, Altura y Peso deben ser números.');
    }

    return errors;
}
