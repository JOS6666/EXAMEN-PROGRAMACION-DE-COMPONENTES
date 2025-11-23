import React, { Component } from "react";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: "Mouse", price: 15000 },
        { id: 2, name: "Teclado", price: 25000 },
        { id: 3, name: "Audífonos", price: 40000 },
      ],
      cart: [],
    };
  }

  handleAddToCart = (product) => {
    this.setState((prev) => {
      const cart = [...prev.cart];
      const foundIndex = cart.findIndex((it) => it.id === product.id);

      if (foundIndex >= 0) {
        cart[foundIndex].qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }

      return { cart };
    });
  };

  handleRemove = (id) => {
    this.setState((prev) => ({
      cart: prev.cart.filter((p) => p.id !== id),
    }));
  };

  getTotal = () =>
    this.state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  render() {
    return (
      <div className="container mt-4">
        <h2 className="fw-bold mb-4 text-primary text-center">
          Listado de Productos
        </h2>

        <div className="d-flex flex-wrap justify-content-center">
          {this.state.products.map((p) => (
            <ProductItem key={p.id} product={p} onAdd={this.handleAddToCart} />
          ))}
        </div>

        <div className="card mt-5 shadow-sm">
          <div className="card-header bg-primary text-white fw-bold fs-4 text-center">
            Carrito de Compras
          </div>

          <div className="card-body">
            {this.state.cart.length === 0 ? (
              <p className="text-center text-muted">El carrito está vacío</p>
            ) : (
              <table className="table table-striped text-center align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cart.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold">{item.name}</td>
                      <td>{item.qty}</td>
                      <td className="text-success fw-bold">
                        ${item.price * item.qty}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleRemove(item.id)}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="alert alert-success fw-bold fs-5 text-center mt-4">
              Total a pagar: ${this.getTotal()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
