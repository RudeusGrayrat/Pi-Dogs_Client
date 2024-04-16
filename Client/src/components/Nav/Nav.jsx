import { NavLink, useLocation, } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';
import { useDispatch, } from 'react-redux';
import { clean, inicio, changePage, next, preview} from '../../redux/actions';

function Nav() {

   const location = useLocation()
   const dispatch = useDispatch()

   if (location.pathname === '/' || location.pathname === "/create" || location.pathname.includes("/detail")) {
      return null;
   }
   const Clean = () => {
      dispatch(inicio())
      dispatch(clean())
      dispatch(changePage(1, 0))
      dispatch(next(true))
      dispatch(preview(false))
   };


   return (
      <div className={styles.Nav}>
         <NavLink to="/home"
            className={styles.navlink}>
            <button className={styles.button}
               onClick={Clean}
            >
               Inicio
            </button>
         </NavLink>

         <SearchBar />


         <NavLink to="/create"
            className={styles.navlink}>
            <button className={styles.button}>
               Crear
            </button>
         </NavLink>

      </div>
   );
}

export default Nav;
