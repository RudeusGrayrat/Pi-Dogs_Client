import { useDispatch, useSelector } from "react-redux"
import styles from './Pagination.module.css'
import { changePage, sliceMas, sliceMenos,  next, preview } from "../../redux/actions";

function Pagination() {
    const buscado = useSelector((state) => state.dogName);
    const characters = useSelector((state) => state.allDogs)
    const paginado = useSelector((state) => state.paginado);
    const paginaActual = useSelector((state) => state.paginaActual);
    const filtros = useSelector((state) => state.filter);
    const showSiguiente = useSelector((state) => state.siguiente)
    const showAtras = useSelector((state) => state.atras)
    const dispatch = useDispatch()

    let respuesta = null
    if (filtros?.length > 0) {
        respuesta = filtros
    } else if (buscado?.length > 0) {
        respuesta = buscado
    } else {
        respuesta = characters
    }

    const atras = () => {
        if (paginado < 8) {
            dispatch(preview(false))
            return null
        } else {
            dispatch(next(true))
            dispatch(changePage(paginaActual, - 1))
            dispatch(sliceMenos(paginado))

        }
    }
    const siguiente = () => {
        if (respuesta.length / 8 <= paginaActual) {
            dispatch(next(false))
            return null
        } else {
            dispatch(preview(true))
            dispatch(changePage(paginaActual, 1))
            dispatch(sliceMas(paginado))
        }
    }

    if (buscado.length > 8) {
        return null
    } else {
        return (
            <div>
                {showAtras && (<button onClick={atras}>
                    Atras
                </button>)}
                <span className={styles.span}>{paginaActual}</span>
                {showSiguiente && (<button onClick={siguiente}>
                    Siguiente
                </button>)}
            </div>
        )
    }

}

export default Pagination