import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs } from '../../redux/actions';
import { useEffect } from 'react';
import Filters from '../Filters/Filters';

function Cards() {
    const dogs = useSelector((state) => state.dogName)
    const characters = useSelector((state) => state.allDogs)
    const slice8 = useSelector((state) => state.paginado);
    const filtros = useSelector((state) => state.filter);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [])

    let respuesta = null
    if (filtros?.length > 0) {
        respuesta = filtros
    } else if(dogs?.length > 0) {
        respuesta = dogs
    } else {
        respuesta = characters
    }

    return (
        <div className={styles.home}>
            <div>
                <Filters />
            </div>
            <div className={styles.cards}>

                {(respuesta?.slice(0 + slice8, 8 + slice8)?.map((char) => {
                    if (char.id) {
                        return (
                            <Card
                                key={char.id}
                                id={char.id}
                                name={char.name}
                                image={char.imagen || char.image.url}
                                temperament={char.temperaments ? char?.temperaments[0]?.name : char?.temperament?.split(", ").slice(0, 2).join(", ")}
                                peso={char.weight?.metric || char.weight}
                            />
                        );

                    } else {
                        console.warn('Data is missing or incomplete for character:', char);
                        return null;
                    }
                }))}
            </div>
        </div>
    );
}



export default Cards;


