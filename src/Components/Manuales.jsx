import { PokeNavbar } from "./Navbar"

export const Manuales = () => {
    return (
        <>
        <PokeNavbar />

        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 card">
                    <div className="container">
                        <p className="p-card">Manual Tecnico</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12 card">
                    <div className="container">
                        <p className="p-card">Manual de Usuario</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
