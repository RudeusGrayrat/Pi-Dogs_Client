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
    const paginaActual = useSelector((state) => state.paginaActual);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs(0 ,48 ))
    }, [])

    const respuesta = dogs?.length > 0 ? dogs : characters.slice(0 + slice8, 8+ slice8)


    return (
        <div className={styles.home}>
            <div>
                <Filters/>
            </div>
            <div className={styles.cards}>

                {(respuesta?.map((char) => {
                    if (char.sprites) {
                        return (
                            <Card
                                key={char.id}
                                id={char.id}
                                image={char.imagen}
                                name={char.name}
                                types={char.types?.map((ty) => ty.type.name)}
                            />
                        )

                    } else if (char.id) {
                        return (
                            <Card
                                key={char.id}
                                id={char.id}
                                name={char.name}
                                image={char.imagen}
                                temperament={char?.temperament.split(", ").slice(0,2).join(", ")}
                                peso={char.weight?.metric}
                            />
                        );
                    } else if (char.url) {
                        const idapi = Number(char.url.split("/").slice(-2, -1)[0]);
                        return (
                            <Card
                                key={idapi}
                                id={idapi}
                                name={char.name}
                                url={char.url}
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


