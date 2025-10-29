import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Productos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>ID</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Nombre</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Categoría</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Subcategoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.Product_ID}>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{p.Product_ID}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{p.Product_Name}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{p.Category}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{p.Sub_Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}