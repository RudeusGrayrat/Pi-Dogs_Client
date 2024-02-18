import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchTypes } from "../../redux/actions";

function Filters() {

    const [filterType, setFilterType] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const tipos = useSelector((state) => state.tipos)
    const dispatch = useDispatch()

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filter = () => {
        setShowFilter(true);
        setShowOrder(false);
        // dispatch(fetchTypes())

    };

    const order = () => {
        setShowFilter(false);
        setShowOrder(true);
    };

    return (
        <>
            <button onClick={filter}>Filtrar</button>
            <button onClick={order}>Ordenar</button>

            {showFilter && (
                <div>
                    <label>
                        Tipo:
                        <select value={filterType} onChange={handleFilterChange}>
                            {(tipos.map((tip) => {
                                return <option
                                    key={tip.id}
                                    value={tip.name}>
                                    {tip.name}
                                </option>
                            }))}
                        </select>
                    </label>
                    <label>
                        Origen:
                        <select value={filterType} onChange={handleFilterChange}>
                            <option value="api">API</option>
                            <option value="all">Base de Datos</option>
                        </select>
                    </label>
                </div>
            )}

            {showOrder && (
                <div>
                    <label>
                        Ordenar:
                        <select value={filterType} onChange={handleFilterChange}>
                            <option value="alphabetical">Alfabético</option>
                            <option value="attack">Ataque</option>
                        </select>
                    </label>
                    <label>
                        <select value={filterType} onChange={handleFilterChange}>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </label>
                </div>
            )}
        </>
    );
}

export default Filters;
