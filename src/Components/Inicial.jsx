import { useState } from "react"
import { pokeData } from "../Api/ApiPokemon"
import { PokeNavbar } from "./Navbar"
import { useEditor, useError } from "../context/ErrorContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const Inicial = () => {

    const { editorText, setEditorText } = useEditor();
    const [apiResponse, setApiResponse] = useState('');
    const [tokenList, setTokenList] = useState([])

    console.log("Tokenlst", tokenList);
    console.log("ErrorList", tokenList.errorList);

    const { setErrors } = useError();
    const navigate = useNavigate();

    const handlePokeData = async () => {
        const result = await pokeData(editorText); // Suponiendo que tienes editorText en tu state

        if (result) {
            setTokenList(result.tokens || []);
            setErrors(result.errors || []);

            if (result.errors.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Errores detectados',
                    text: 'Se detectaron errores. Puedes verlos en la sección de Reporte.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <>
            <PokeNavbar />

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-token">
                        <textarea className="form-control text-editor"
                            value={editorText}
                            onChange={(e) => setEditorText(e.target.value)}
                            // onChange={({ target }) => setEditorText(target.value)}
                            rows="10"
                            cols="50"
                        />
                        <button className="btn btn-analizar" onClick={handlePokeData}>Analizar</button>
                        <button className="btn btn-analizar" onClick={() => { setEditorText(''); setApiResponse(''); }}>Limpiar Editor</button>
                    </div>
                    <div className="col-token col-lg-6 col-md-6 col-sm-12 table-responsive table-bordered table-striped table-h">
                        <h1 className="text-center">Tabla de Tokens</h1>
                        <table className="table table-hover table-bordered table-striped table-danger">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Fila</th>
                                    <th scope="col">Columna</th>
                                    <th scope="col">Lexema</th>
                                    <th scope="col">Token</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tokenList.map((token, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{token.row}</td>
                                        <td>{token.column}</td>
                                        <td>{token.lexeme}</td>
                                        <td>{token.typeToken}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
