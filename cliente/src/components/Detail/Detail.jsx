import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharacter } from '../../redux/actions';
import styles from './Detail.module.css';
import style from '../Card/Card.module.css';

function Detail(props) {
   const { id } = useParams();

   const character = useSelector((state) => state.dogDetails)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCharacter(id))
   }, [id])


   const getTemperaments = () => {
      if (!character.temperaments) return null;
      if (character.temperaments.length === 1) {
         return character.temperaments[0].name;
      }
      return character.temperament?.split(", ").slice(0,2).join(", ") 
   };

   return (
      <div className={styles.detail}>
         {character ? (
            <>
               <div className={styles.info}>
                  <h3>{character.id}</h3>
                  <h2>{character?.name}</h2>
                  <h2>{character?.weight?.metric || character?.weight}</h2>
                  <h2>{character?.height?.metric || character?.height}</h2>
                  <h2>{getTemperaments()}</h2>
                  <h2>{character.life_span}</h2>
               </div>
               <div className={styles.ima}>
                  <img src={character.imagen} alt={character.image} className={style.imagenCard} />
               </div>
            </>
         ) : (
            <p>Cargando...</p>
         )}
      </div>
   );
}

export default Detail;