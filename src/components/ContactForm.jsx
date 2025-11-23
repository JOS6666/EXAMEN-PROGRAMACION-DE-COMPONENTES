import React, { Component } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      sending: false,
      success: null,
      errors: {},
    };
  }

  // Validación manual sin librerías (simple, clara y segura)
  validate = () => {
    const errors = {};

    if (!this.state.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.state.email.trim() || !emailRegex.test(this.state.email)) {
      errors.email = "Debe ingresar un correo válido.";
    }

    if (this.state.message.trim().length < 10) {
      errors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    return errors;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: null },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors, success: null });
      return;
    }

    this.setState({ sending: true, success: null });

    try {
      // Guardar en Firestore
      await addDoc(collection(db, "contacts"), {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
        createdAt: new Date().toISOString(),
      });

      // Mostrar mensaje de éxito
      this.setState({
        name: "",
        email: "",
        message: "",
        sending: false,
        success: true,
        errors: {},
      });
    } catch (err) {
      console.error("Firestore error:", err);
      this.setState({
        sending: false,
        success: false,
      });
    }
  };

  render() {
    const { name, email, message, sending, success, errors } = this.state;

    return (
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 className="text-primary fw-bold mb-4 text-center">
          Formulario de Contacto
        </h2>

        <form onSubmit={this.handleSubmit} noValidate>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Mensaje */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Mensaje</label>
            <textarea
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              rows="4"
              name="message"
              value={message}
              onChange={this.handleChange}
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar Formulario"}
          </button>

          {/* Mensajes de resultado */}
          {success === true && (
            <div className="alert alert-success mt-4 text-center fw-semibold">
              ✔ El formulario fue enviado correctamente.
            </div>
          )}

          {success === false && (
            <div className="alert alert-danger mt-4 text-center fw-semibold">
              ✖ Hubo un error al enviar. Intente nuevamente.
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default ContactForm;
