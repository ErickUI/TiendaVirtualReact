import { Link } from 'react-router-dom';
import { useCatalogo } from '../../catalogo/hooks/useCatalogo';
import { useCarrito } from '../../carrito/hooks/useCarrito';

function HomePage() {
    const { productos } = useCatalogo();
    const { agregar } = useCarrito();

    const agregarPorId = (id: number) => {
        const producto = productos.find((p) => Number(p.id) === id);
        if (!producto) {
            alert('Producto no disponible en el catálogo.');
            return;
        }
        agregar(producto);
    };

    return (
        <main className="mt-5 pt-4">
            {/* HERO / BANNER */}
            <section id="inicio" className="seccion-hero">
                <div className="container">
                    <div
                        id="carruselInicio"
                        className="carousel slide banner-inicio"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="/imagenes/Banner1.jpeg"
                                    className="d-block imagen-hero"
                                    alt="Banner principal 1"
                                />
                            </div>

                            <div className="carousel-item">
                                <img
                                    src="/imagenes/Banner2.jpg"
                                    className="d-block imagen-hero"
                                    alt="Banner principal 2"
                                />
                            </div>

                            <div className="carousel-item">
                                <img
                                    src="/imagenes/Banner3.jpg"
                                    className="d-block imagen-hero"
                                    alt="Banner principal 3"
                                />
                            </div>
                        </div>

                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carruselInicio"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carruselInicio"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* DESTACADOS */}
            <section id="destacados" className="seccion">
                <div className="container">
                    <h2 className="titulo-seccion text-center mb-4">
                        Productos Destacados
                    </h2>

                    <div className="contenedor-productos">
                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/LaptopMSI.jpg"
                                className="foto"
                                alt="Laptop Gamer"
                            />
                            <div className="contenido">
                                <h5>MSI Titan 18 HX</h5>
                                <p>Portátil Gamer diseñado para el mejor performance.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(11)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/TecladoAula.jpg"
                                className="foto"
                                alt="Teclado Aula"
                            />
                            <div className="contenido">
                                <h5>Teclado Aula Win 68 HE MAX</h5>
                                <p>
                                    Máximo rendimiento con un tiempo de respuesta de 0.001 ms.
                                </p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(12)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/AudifonosRazer.jpg"
                                className="foto"
                                alt="Audífonos Razer"
                            />
                            <div className="contenido">
                                <h5>Audifonos Razer Kraken</h5>
                                <p>
                                    Sonido envolvente 7.1 inmersivo para audio posicional.
                                </p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(13)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/iPhone17ProMax.jpg"
                                className="foto"
                                alt="iPhone 17"
                            />
                            <div className="contenido">
                                <h5>iPhone 17 Pro Max</h5>
                                <p>Rendimiento y cámara de alto nivel.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(14)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* CATEGORÍAS */}
            <section id="categorias" className="seccion seccion alternativa">
                <div className="container">
                    <h2 className="titulo-seccion text-center mb-4">Categorías</h2>

                    <div className="bloque-categorias">
                        <div className="tarjeta-cat">
                            <div
                                id="catLaptops"
                                className="carousel slide categoria-carousel"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="/imagenes/Ca-Laptops.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Laptop 1"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/imagenes/Ca-Laptops2.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Laptop 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="info-cat">
                                <h5>Laptops</h5>
                                <p>Rapidez y movilidad.</p>
                                <Link className="btn btn-simple" to="/catalogo">
                                    Ver productos
                                </Link>
                            </div>
                        </div>

                        <div className="tarjeta-cat">
                            <div
                                id="catAudio"
                                className="carousel slide categoria-carousel"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="/imagenes/Ca-Audifonos.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Audífonos 1"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/imagenes/Ca-Audifonos2.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Audífonos 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="info-cat">
                                <h5>Audífonos</h5>
                                <p>Sonido nítido y profesional.</p>
                                <Link className="btn btn-simple" to="/catalogo">
                                    Ver productos
                                </Link>
                            </div>
                        </div>

                        <div className="tarjeta-cat">
                            <div
                                id="catCelulares"
                                className="carousel slide categoria-carousel"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="/imagenes/Ca-Celulares.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Celular 1"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/imagenes/Ca-Celulares2.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Celular 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="info-cat">
                                <h5>Celulares</h5>
                                <p>Modelos de última generación.</p>
                                <Link className="btn btn-simple" to="/catalogo">
                                    Ver productos
                                </Link>
                            </div>
                        </div>

                        <div className="tarjeta-cat">
                            <div
                                id="catTeclados"
                                className="carousel slide categoria-carousel"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="/imagenes/Ca-Teclados.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Teclado 1"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/imagenes/Ca-Teclado2.jpg"
                                            className="d-block w-100 cat-img"
                                            alt="Teclado 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="info-cat">
                                <h5>Teclados</h5>
                                <p>Precisión y rapidez al escribir.</p>
                                <Link className="btn btn-simple" to="/catalogo">
                                    Ver productos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NOVEDADES */}
            <section id="novedades" className="seccion">
                <div className="container">
                    <h2 className="titulo-seccion mb-4">Productos Novedosos</h2>

                    <div className="bloque-novedades">
                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/Laptop1.jpg"
                                className="foto"
                                alt="ASUS TUF"
                            />
                            <div className="contenido">
                                <h5>ASUS TUF Gaming F16</h5>
                                <p>Alto desempeño y durabilidad.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(15)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/Laptop2.jpg"
                                className="foto"
                                alt="Vivobook"
                            />
                            <div className="contenido">
                                <h5>ASUS Vivobook 15</h5>
                                <p>Ligera y eficiente para estudio.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(16)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/Laptop3.jpg"
                                className="foto"
                                alt="HP 15"
                            />
                            <div className="contenido">
                                <h5>HP 15</h5>
                                <p>Balance entre velocidad y precio.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(17)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>

                        <article className="tarjeta-item">
                            <img
                                src="/imagenes/Laptop4.jpg"
                                className="foto"
                                alt="IdeaPad"
                            />
                            <div className="contenido">
                                <h5>Lenovo IdeaPad 3</h5>
                                <p>Rendimiento para el día a día.</p>
                                <button
                                    className="btn btn-accion"
                                    onClick={() => agregarPorId(18)}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            {/* ACERCA DE */}
            <section id="AcercaDe" className="seccion seccion-clara">
                <div className="container">
                    <h2 className="titulo-seccion text-center mb-4">Acerca de Nosotros</h2>

                    <div className="area-info">
                        <div className="cuadro-info">
                            <h5>Historia</h5>
                            <p>
                                Esta tienda se creó para ofrecer las mejores ofertas y productos de
                                tecnología, con precios accesibles y siendo una empresa confiable
                                para todo tipo de usuario.
                            </p>
                        </div>

                        <div className="cuadro-info">
                            <h5>Misión</h5>
                            <p>
                                Empresa: Brindar productos actualizados, buenos precios y un
                                servicio cercano y responsable.
                            </p>
                            <p>Misión personal: Hacer uso de los recursos aprendidos en clase.</p>
                        </div>

                        <div className="cuadro-info">
                            <h5>Visión</h5>
                            <p>
                                Ser una tienda de referencia en tecnología, reconocida por la
                                confianza y la innovación.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="seccion">
                <div className="container">
                    <h2 className="titulo-seccion text-center mb-4">Contáctenos</h2>

                    <div className="row g-4 align-items-start">
                        <div className="col-md-6">
                            <form className="formulario-contacto">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Ingrese su nombre"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correo"
                                        placeholder="ejemplo@correo.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">
                                        Mensaje
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="mensaje"
                                        rows={4}
                                        placeholder="Escriba su consulta"
                                    />
                                </div>
                                <button type="submit" className="btn btn-accion">
                                    Enviar mensaje
                                </button>
                            </form>
                        </div>

                        <div className="col-md-6">
                            <div className="datos-contacto">
                                <h5>Información de la tienda</h5>
                                <p>Dirección: Avenida Petit Thouars 116, Lima 15046.</p>
                                <p>Teléfono: 989485930</p>
                                <p>Horario: Lun - Vie 9:00 - 19:00 · Sáb 10:00 - 18:00</p>
                                <p>Correo: soporte@tiendautpweb.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p className="text-center m-0">© 2025 Tienda UTP Web — Lima, Perú</p>
            </footer>
        </main>
    );

}

export default HomePage;
