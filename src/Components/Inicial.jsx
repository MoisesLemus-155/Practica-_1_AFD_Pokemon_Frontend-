import { useEffect, useState } from "react"
import { pokeData } from "../Api/ApiPokemon"
import { PokeNavbar } from "./Navbar"
import { useEditor, useError } from "../context/ErrorContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const Inicial = () => {

    const { editorText, setEditorText } = useEditor();
    const [tokenList, setTokenList] = useState([])
    const [jugadores, setJugadores] = useState([]);
    const [pokemonImages, setPokemonImages] = useState({});

    const fetchPokemonImage = async (pokemonName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            const data = await response.json();
            return data.sprites.other['official-artwork'].front_default;
        } catch (error) {
            console.error(`Error cargando imagen de ${pokemonName}:`, error);
            return '';
        }
    };

    const { setErrors } = useError();
    const navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
    };

    const handleFileLoad = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            console.log("Archivo cargado:", content);
            setEditorText(content);
        };
        reader.onerror = (e) => {
            console.error("Error al leer el archivo:", e);
        };
        reader.readAsText(file);
    };


    const handleFileClick = () => {
        document.getElementById("fileInput").click();
    };


    const handlePokeData = async () => {
        const result = await pokeData(editorText);
        if (result) {
            const errores = result.errors || [];
            setErrors(errores);
            if (errores.length > 0) {
                setTokenList([]);
                setJugadores([]);
                Swal.fire({
                    icon: 'error',
                    title: 'Errores detectados',
                    text: 'Se detectaron errores. Puedes verlos en la sección de Reporte.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/Reporte');
                });
            } else {
                setTokenList(result.tokens || []);
                setJugadores(result.jugadores || []);
            }
        }
    };

    useEffect(() => {
        const loadPokemonImages = async () => {
            const imageMap = {};
            for (const jugador of jugadores) {
                for (const pokemon of jugador.topPokemons) {
                    const nombre = pokemon.nombre.toLowerCase();
                    if (!imageMap[nombre]) {
                        const imageUrl = await fetchPokemonImage(nombre);
                        imageMap[nombre] = imageUrl;
                    }
                }
            }
            setPokemonImages(imageMap);
        };
        if (jugadores.length > 0) {
            loadPokemonImages();
        }
    }, [jugadores]);


    return (
        <>
            <PokeNavbar onFileClick={handleFileClick} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-token">
                        <textarea className="form-control text-editor"
                            value={editorText}
                            onChange={(e) => setEditorText(e.target.value)}
                            rows="10"
                            cols="50"
                        />
                        <button className="btn btn-analizar" onClick={handlePokeData}>Analizar</button>
                        <button className="btn btn-analizar" onClick={() => { refreshPage() }}>Limpiar Editor</button>
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
                <div className="row mt-4">
                    <h1 className="text-center">Jugadores</h1>
                    {jugadores.map((jugador, index) => (
                        <div className="col-12 mb-4" key={index}>
                            <div className="poke-card shadow-sm p-3">
                                <h4 className="text-center mb-3">{jugador.nombre}</h4>
                                <div className="row">
                                    {jugador.topPokemons.map((pokemon, pIndex) => (
                                        <div className="col-6 mb-3" key={pIndex}>
                                            <div className="border rounded p-2 bg-light text-center">
                                                <img
                                                    src={pokemonImages[pokemon.nombre.toLowerCase()]}
                                                    alt={pokemon.nombre}
                                                    style={{ width: '100px', height: '100px' }}
                                                    className="mb-2"
                                                />
                                                <div>
                                                    <strong>{pokemon.nombre}</strong> ({pokemon.tipo})<br />
                                                    Salud: {pokemon.salud}<br />
                                                    Ataque: {pokemon.ataque}<br />
                                                    Defensa: {pokemon.defensa}<br />
                                                    IVs: {pokemon.ivs}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {jugador.topPokemons.length === 0 && (
                                        <div className="col-12">
                                            <p className="text-muted">Este jugador no tiene pokémon válidos.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <input
                type="file"
                id="fileInput"
                accept=".pklfp"
                style={{ display: 'none' }}
                onChange={handleFileLoad}
            />
        </>
    )
}
