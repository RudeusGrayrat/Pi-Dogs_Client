import axios from 'axios';
import styles from "./Form.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemperaments } from "../../redux/actions";

const Form = () => {
    const temperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
    useEffect(()=>{
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



    const createPokemon = async () => {
        const url = 'http://localhost:3001/dogs'

        await axios.post(url, userData)

        setUseData({
            name: '',
            imagen: '',
            height: "",
            weight: "",
            life_span: "",
            temperament: [],
        });
    }

    const click = () => {
        createPokemon()
    }

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
                        value={userData.name}
                        onChange={handleChange} />
                </div>
                <div className={styles.form}>
                    <label >Imagen:</label>
                    <input
                        type='text'
                        id='imagen'
                        name='imagen'
                        placeholder='http://imagen.png'
                        value={userData.imagen}
                        onChange={handleChange} />
                </div>
                <div className={styles.form}>
                    <label >Altura:</label>
                    <input type='text'
                        id='height'
                        name='height'
                        value={userData.height}
                        onChange={handleChange} />
                </div>
                <div className={styles.form}>
                    <label >Peso:</label>
                    <input
                        type='text'
                        id='weight'
                        name='weight'
                        value={userData.weight}
                        onChange={handleChange} />
                </div>
                <div>
                    <label >Años De Vida:</label>
                    <input type='text'
                        id='life_span'
                        name='life_span'
                        value={userData.life_span}
                        onChange={handleChange} />
                </div>

                <div>
                    <label >Temperamento:</label>
                    <select multiple={true}
                        id="temperament"
                        name="temperament"
                        value={userData.temperament}
                        onChange={handleTemperament}  >
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
