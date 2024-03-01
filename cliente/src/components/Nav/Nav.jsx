import { NavLink, useLocation, } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';
import { useDispatch, } from 'react-redux';
import { clean, inicio } from '../../redux/actions';

function Nav(props) {
   
   const location = useLocation()
   const dispatch = useDispatch()

   if (location.pathname === '/' || location.pathname === "/create" || location.pathname.includes("/detail")) {
      return null;
   }
   const Clean = () => {
      dispatch(inicio())
      dispatch(clean())
   };


   return (
      <div className={styles.Nav}>
         <NavLink to="/home"
            className={styles.navlink}>
            <button className={styles.button}
               onClick={Clean}
               >

               Home
            </button>
         </NavLink>

         <SearchBar />


         <NavLink to="/create"
            className={styles.navlink}>
            <button className={styles.button}>
               +
            </button>
         </NavLink>

      </div>
   );
}

export default Nav;
