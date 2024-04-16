import { NavLink } from "react-router-dom"
import styles from "./Landing.module.css";

function Landing() {

  return (
    <div >
      <div className={styles.bienvenido}>
        <NavLink to="/home" className={styles.navlink}>
          <h1 className={styles.dogs}>
            DOGS
          </h1 >
        </NavLink>
        <p className={styles.nc}>
          create by @Miguelnc
        </p>

      </div>


      <footer>
        <a
          href="https://github.com/RudeusGrayrat"
          className={styles.a}>
          "@RudeusGrayrat"
        </a>
        en github
      </footer>
    </div>
  );
}

export default Landing;