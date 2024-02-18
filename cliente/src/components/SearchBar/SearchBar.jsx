import { useState } from "react";
import styles from "./SearchBar.module.css" 
import { useDispatch } from "react-redux";
import { searchDog } from "../../redux/actions";

export default function SearchBar(props) {
   const dispatch = useDispatch()
   
   const [name, setName] = useState("")

   const handleChange = (e)=>{
      setName([e.target.value])
   }
   const handleSearch = ()=>{
      dispatch(searchDog(name))
   }

    return (
       <div className={styles.searchBar}>
          <input className={styles.buscador} type='search' value={name} onChange={handleChange}/>
          <button onClick={handleSearch}>Buscar</button>
       </div>
    );
 }
 