import axios from 'axios';
import styles from "./Form.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemperaments } from "../../redux/actions";
import validateForm from './Validation';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const temperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTemperaments())
    }, [])
    const [userData, setUseData] = useState({
        name: '',
        imagen: '',
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setUseData(
            (data) => ({
                ...data,
                [name]: value
            })
        )

    }

    const handleTemperament = (e) => {
        const { value } = e.target;
        const selected = userData.temperament.includes(value)
        if (selected) {
            setUseData((data) => ({
                ...data,
                temperament: [...data.temperament.filter((option) => option !== value)],
            }));
            
        }else{

            setUseData((data) => ({
                ...data,
                temperament: [...data.temperament, value],
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const validationErrors = validateForm({ [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };

    const validationErrors = validateForm(userData)
    const arrayofValidation = Object.keys(validationErrors)

    const createPokemon = async () => {

        if (arrayofValidation.length === 0) {
            await axios.post('/dogs', userData)
            setUseData({
                name: '',
                imagen: '',
                height: "",
                weight: "",
                life_span: "",
                temperament: [],
            });

        } else {
            setErrors(validationErrors);
        }
    }

    const click = () => {
        createPokemon()
        navigate("/home")
    }

    let deshabilitar = arrayofValidation.length > 0 ? true : false

    return (
        <div className={styles.todo}>
            <h1 className={styles.h1}>Formulario</h1>
            <form>
                <div className={styles.form}>
                    <label >Nombre:</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Ej: dobergirl'
                        value={userData.name}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.name ? (
                        <p>{errors.name}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Imagen (URL):</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='imagen'
                        name='imagen'
                        placeholder='Ej: https://www.imagen.png'
                        value={userData.imagen}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>{errors.imagen ? (
                    <p>{errors.imagen}</p>
                ) : null}</div>
                <div className={styles.form}>
                    <label >Altura (metros):</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='height'
                        name='height'
                        placeholder='Ej: 1 - 2'
                        value={userData.height}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.height ? (
                        <p>{errors.height}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Peso (Kg):</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='weight'
                        name='weight'
                        placeholder='Ej: 50 - 70'
                        value={userData.weight}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.weight ? (
                        <p>{errors.weight}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Años De Vida:</label>
                    <input
                        className={styles.input}
                        type='text'
                        id='life_span'
                        name='life_span'
                        placeholder='Ej: 4 - 8'
                        value={userData.life_span}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.life_span ? (
                        <p>{errors.life_span}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Temperamento(s):</label>
                    <select
                        className={styles.input}
                        multiple={true}
                        id="temperament"
                        name="temperament"
                        value={userData.temperament }
                        onChange={handleTemperament}>
                        {(temperaments.map((tip) => {
                            return <option
                                key={tip.id}
                                value={tip.name}>
                                {tip.name}
                            </option>
                        }))}
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={click}
                    disabled={deshabilitar}
                    className={styles.button}>Crear Nueva Raza</button>

            </form>
        </div >
    );
};

export default Form;
