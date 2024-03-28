import { NavLink } from "react-router-dom"
import styles from "./Landing.module.css";

function Landing() {

  return (
    <div >
      <div className={styles.bienvenido}>
        <NavLink to="/home" className={styles.navlink}>
          <h1 className={styles.pokemons}>
            DOGS
          </h1 >
        </NavLink>
        <p className={styles.nc}>
          create by @nc
        </p>

      </div>
      <footer>"RudeusGrayrat" en github</footer>
    </div>
  );
}

export default Landing;