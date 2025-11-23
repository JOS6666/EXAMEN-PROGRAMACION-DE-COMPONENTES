import React from "react";

const ProductItem = ({ product, onAdd }) => {
  return (
    <div
      className="card shadow-sm m-3"
      style={{ width: "16rem", borderRadius: "12px" }}
    >
      {product.img ? (
        <img
          src={product.img}
          className="card-img-top"
          alt={product.name}
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        />
      ) : (
        <div
          className="bg-light text-center p-5"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        >
          <i className="bi bi-box-seam fs-1 text-secondary"></i>
        </div>
      )}

      <div className="card-body text-center">
        <h5 className="fw-bold">{product.name}</h5>
        <p className="text-success fw-semibold fs-5">${product.price}</p>

        <button
          className="btn btn-primary w-100 fw-bold"
          onClick={() => onAdd(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
