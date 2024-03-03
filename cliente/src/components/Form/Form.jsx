import axios from 'axios';
import styles from "./Form.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemperaments } from "../../redux/actions";
import validateForm from './Validation';

const Form = () => {
    const temperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
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
        setUseData((data) => ({
            ...data,
            temperament: [...data.temperament, value],
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const validationErrors = validateForm({ [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };

    const createPokemon = async () => {
        const url = 'http://localhost:3001/dogs'

        const validationErrors = validateForm(userData)
        if (Object.keys(validationErrors).length === 0) {
            await axios.post(url, userData)
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
    }
    console.log(userData);

    return (
        <div className={styles.todo}>
            <h2>FORM PAGE</h2>
            <form>
                <div className={styles.form}>
                    <label >Nombre:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='nombre'
                        value={userData.name}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.name ? (
                        <p>{errors.name}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Imagen:</label>
                    <input
                        type='text'
                        id='imagen'
                        name='imagen'
                        placeholder='http://imagen.png'
                        value={userData.imagen}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>{errors.imagen ? (
                    <p>{errors.imagen}</p>
                ) : null}</div>
                <div className={styles.form}>
                    <label >Altura:</label>
                    <input type='text'
                        id='height'
                        name='height'
                        placeholder='ejemplo: 1 - 2'
                        value={userData.height}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.height ? (
                        <p>{errors.height}</p>
                    ) : null}</div>
                <div className={styles.form}>
                    <label >Peso:</label>
                    <input
                        type='text'
                        id='weight'
                        name='weight'
                        placeholder='ejemplo: 50 - 70'
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
                    <input type='text'
                        id='life_span'
                        name='life_span'
                        placeholder='ejemplo: 4 - 8 years'
                        value={userData.life_span}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className={styles.par}>
                    {errors.life_span ? (
                        <p>{errors.life_span}</p>
                    ) : null}</div>
                <div>
                    <label >Temperamento:</label>
                    <select
                        className={styles.custome}
                        multiple={true}
                        id="temperament"
                        name="temperament"
                        value={userData.temperament}
                        onChange={handleTemperament}  >
                        <option value="">Seleccionar Temperamento</option>
                        {(temperaments.map((tip) => {
                            return <option
                                key={tip.id}
                                value={tip.name}>
                                {tip.name}
                            </option>
                        }))}
                    </select>
                </div>
                <button type="submit" onClick={click}>Crear Dog</button>

            </form>
        </div >
    );
};

export default Form;
