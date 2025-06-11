import { PokeNavbar } from "./Navbar"
import Swal from "sweetalert2";

export const Manuales = () => {
    const handleDownload = (tipo) => {
        const nombreArchivo =
            tipo === "tecnico" ? "Manual_Tecnico_PokeAyuda.pdf" : "Manual_de_Usuario_PokeAyuda.pdf";

        Swal.fire({
            title: `¿Deseas descargar el manual ${tipo === "tecnico" ? "técnico" : "de usuario"}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, descargar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const link = document.createElement("a");
                link.href = `/${nombreArchivo}`; // Desde carpeta public
                link.download = nombreArchivo;
                link.click();
            }
        });
    };

    return (
        <>
            <PokeNavbar />

            <div className="container mt-5">
                <div className="row justify-content-center gap-4">
                    <div
                        className="col-lg-5 col-md-5 col-sm-12 card"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDownload("tecnico")}
                    >
                        <div className="container text-center py-4">
                            <p className="p-card h5">📘 Manual Técnico</p>
                        </div>
                    </div>

                    <div
                        className="col-lg-5 col-md-5 col-sm-12 card"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDownload("usuario")}
                    >
                        <div className="container text-center py-4">
                            <p className="p-card h5">📗 Manual de Usuario</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
