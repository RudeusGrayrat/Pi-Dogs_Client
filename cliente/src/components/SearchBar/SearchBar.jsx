import { useState } from "react";
import styles from "./SearchBar.module.css" 
import { useDispatch } from "react-redux";
import { searchDog, changePage, next, preview } from "../../redux/actions";

export default function SearchBar(props) {
   const dispatch = useDispatch()
   
   const [name, setName] = useState("")

   const handleChange = (e)=>{
      setName([e.target.value])
   }
   const handleSearch = ()=>{
      dispatch(searchDog(name))
      setName("")
      dispatch(changePage(1, 0))
      dispatch(next(true))
      dispatch(preview(false))
   }

    return (
       <div className={styles.searchBar}>
          <input className={styles.buscador} 
          type='search' value={name} 
          placeholder="Buscar perro..."
          onChange={handleChange}/>
          <button onClick={handleSearch}>Buscar</button>
       </div>
    );
 }
 