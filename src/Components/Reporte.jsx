import { useError } from '../context/ErrorContext';
import { PokeNavbar } from './Navbar';

export const Reporte = () => {
    const { errors } = useError();
    return (
        <>
            <PokeNavbar />
            <div className="container mt-4">
                <h2>Reporte de Errores</h2>
                {errors.length === 0 ? (<p>No se encontraron errores.</p>) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Fila</th>
                                <th>Columna</th>
                                <th>Lexema</th>
                                <th>Token</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errors.map((error, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{error.row}</td>
                                    <td>{error.column}</td>
                                    <td>{error.lexeme}</td>
                                    <td>{error.typeToken}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};