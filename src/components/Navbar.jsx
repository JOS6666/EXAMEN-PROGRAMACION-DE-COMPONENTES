import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Jose Caamaño Sepulveda
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contact">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-light ms-2"
                to="/contact"
              >
                Enviar al formulario
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
