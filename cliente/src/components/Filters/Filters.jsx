import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperaments, filters, changePage, inicio, orders } from "../../redux/actions";
import styles from "./Filters.module.css";

function Filters() {
    const dogsName = useSelector((state) => state.dogName)
    const characters = useSelector((state) => state.allDogs)
    const filtros = useSelector((state) => state.filter);
    const orden = useSelector((state) => state.order);
    const temperaments = useSelector((state) => state.temperaments)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()

    let respuesta = null
    if (filtros?.length > 0) {
        respuesta = filtros
    } else if (orden?.length > 0) {
        respuesta = orden
    } else if (dogsName?.length > 0) {
        respuesta = dogsName
    } else {
        respuesta = characters
    }

    const [filter, setFilter] = useState({
        temperament: "",
        origin: ""
    });
    const [order, setOrder] = useState({
        tipo: "",
        asc_desc: "",

    });
    const [showFilter, setShowFilter] = useState(false);
    const [showOrder, setShowOrder] = useState(false);


    const handleFilter = (e) => {
        const { name, value } = e.target
        // if(name==="temperament"){
        //     setFilter((data) => ({
        //         ...data,
        //         temperament: [...data.temperament, value],
        //     }))
        // }else{
        setFilter((data) => ({
            ...data,
            [name]: value
        }))
        // }


    };
    const handleOrder = (e) => {
        const { name, value } = e.target

        setOrder((data) => ({
            ...data,
            [name]: value
        }))
    };


    const filterShow = () => {
        setShowFilter(true);
        setShowOrder(false);
        dispatch(fetchTemperaments())
    };

    const ordershow = () => {
        setShowFilter(false);
        setShowOrder(true);
    };
    const cerrar = () => {
        setShowFilter(false);
        setShowOrder(false);
    };

    const cerrarAlert = () => {
        setShowAlert(false);
    };
    
    const actionFilter = () => {
        dispatch(filters(respuesta, filter.temperament, filter.origin, setShowAlert))
        
        setFilter({
            temperament: "",
            origin: ""
        })
        dispatch(inicio())
        dispatch(changePage(1, 0))
    }

    const actionOrder = () => {
        dispatch(orders(respuesta, order.tipo, order.asc_desc))
        setOrder({
            tipo: "",
            asc_desc: ""
        })
        dispatch(inicio())
        dispatch(changePage(1, 0))
    }

    return (
        <>
            <button onClick={filterShow} className={styles.boton}>Filtrar</button>
            <button onClick={ordershow} className={styles.boton}>Ordenar</button>

            {showFilter && (
                <div>
                    <label>
                        Temperamento:</label>
                    <select value={filter.temperament}
                        onChange={handleFilter}
                        name="temperament"
                    >
                        <option value="">Seleccionar </option>
                        {(temperaments.map((tip) => {
                            return <option
                                key={tip.id}
                                value={tip.name}
                            >
                                {tip.name}
                            </option>
                        }))}
                    </select>

                    <label>
                        Origen:
                    </label>
                    <select value={filter.origin}
                        onChange={handleFilter}
                        name="origin">
                        <option value="">Seleccionar</option>
                        <option value="api" >Existentes</option>
                        <option value="bd">Creados</option>
                    </select>
                    <button className={styles.boton} type="button" onClick={actionFilter}>filtrar</button>
                    <button className={styles.cerrar} type="submit" onClick={cerrar}>cerrar</button>

                </div>
            )}

            {showOrder && (
                <div>
                    <label>
                        Ordenar:
                    </label>
                    <select value={order.tipo}
                        onChange={handleOrder}
                        name="tipo">
                        <option value="">Seleccionar </option>
                        <option value="nombre">Nombre</option>
                        <option value="peso">Peso</option>
                    </select>
                    <label>
                    </label>
                    <select value={order.asc_desc}
                        onChange={handleOrder}
                        name="asc_desc">
                        <option value="">Seleccionar </option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <button className={styles.boton} type="button" onClick={actionOrder}>ordenar</button>
                    <button className={styles.cerrar} type="submit" onClick={cerrar}>cerrar</button>

                </div>
            )}

            {showAlert && (
                <>
                    <div className={styles.modal}>
                        <div className={styles.alert}>
                            <div>
                                <span className={styles.span}>⚠️ </span>
                                <span>Hay un Error</span>
                            </div>
                            <div className={styles.div2}>
                                <button className={styles.cerrar2} onClick={cerrarAlert}>close</button>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Filters;
