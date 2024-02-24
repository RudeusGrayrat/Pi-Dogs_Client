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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [])

    const respuesta = dogs?.length > 0 ? dogs : characters.slice(0 + slice8, 8 + slice8)

    return (
        <div className={styles.home}>
            <div>
                <Filters />
            </div>
            <div className={styles.cards}>

                {(respuesta?.map((char) => {
                    if (char.id) {
                        return (
                            <Card
                                key={char.id}
                                id={char.id}
                                name={char.name}
                                image={char.imagen || char.image.url}
                                temperament={char?.temperament?.split(", ").slice(0, 2).join(", ") || char?.temperaments[0].name}
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


