import { useState } from "react";
import styles from "./SearchBar.module.css"
import { useDispatch } from "react-redux";
import { searchDog, changePage, next, preview } from "../../redux/actions";

export default function SearchBar(props) {
   const dispatch = useDispatch()

   const [name, setName] = useState("")

   const handleChange = (e) => {
      setName([e.target.value])
   }
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch();
      }
   }
   const handleSearch = () => {
      dispatch(searchDog(name))
      setName("")
      dispatch(changePage(1, 0))
      dispatch(next(true))
      dispatch(preview(false))
   }

   return (
      <div className={styles.searchBar}>
         <input className={styles.buscadorInput}
            type='search' value={name}
            placeholder="Buscar ..."
            onChange={handleChange}
            onKeyDown={handleKeyDown} />
         <button onClick={handleSearch} className={styles.button}>Buscar</button>
      </div>
   );
}
