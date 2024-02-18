import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import axios from 'axios';
import { useState, } from 'react';


function Card(props) {
  const { id, image, name, peso, temperament, url } = props;
  const [type, setType] = useState([]);


  const tipo = type.map((ty) => ty.type.name);

  return (
    <Link to={`/detail/${id}`} className={styles.namelink}>
      <div className={styles.card}>
        <img src={image} alt="imagen" className={styles.imagenCard} />
        <div className={styles.nombre}>
          <h3>{name}</h3>
          <h3>{temperament}</h3>
          <h3>{peso}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;
