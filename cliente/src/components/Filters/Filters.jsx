import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperaments, filters, } from "../../redux/actions";

function Filters() {
    const dogs = useSelector((state) => state.allDogs)

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

    const temperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()

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

    const action = () => {
        dispatch(filters(dogs, filter.temperament, filter.origin, order.tipo, order.asc_desc))
        setFilter({
            temperament: "",
            origin: ""
        })
        setOrder({
            tipo: "",
            asc_desc: ""
        })
    }

    return (
        <>
            <button onClick={filterShow}>Filtrar</button>
            <button onClick={ordershow}>Ordenar</button>

            {showFilter && (
                <div>
                    <label>
                        Temperamento:</label>
                    <select value={filter.temperament}
                        onChange={handleFilter}
                        name="temperament" 
                        >
                        <option value="">Seleccionar Temperamento</option>
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
                        <select value={filter.origin}
                            onChange={handleFilter}
                            name="origin">
                            <option value="">Seleccionar Origen</option>
                            <option value="api" >API</option>
                            <option value="bd">Base de Datos</option>
                        </select>
                    </label>
                    <button type="button" onClick={action}>filtrar</button>
                    <button type="submit" onClick={cerrar}>x</button>

                </div>
            )}

            {showOrder && (
                <div>
                    <label>
                        Ordenar:
                        <select value={order.tipo}
                            onChange={handleOrder}
                            name="tipo">
                            <option value="">Seleccionar </option>
                            <option value="nombre">Nombre</option>
                            <option value="peso">Peso</option>
                        </select>
                    </label>
                    <label>
                        <select value={order.asc_desc}
                            onChange={handleOrder}
                            name="asc_desc">
                            <option value="">Seleccionar </option>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </label>
                    <button type="button" onClick={action}>ordenar</button>
                    <button type="submit" onClick={cerrar}>x</button>

                </div>
            )}
        </>
    );
}

export default Filters;
