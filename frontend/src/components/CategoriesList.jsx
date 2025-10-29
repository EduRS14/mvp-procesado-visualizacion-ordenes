import React, { useEffect, useState } from "react";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Categorías</h2>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>ID</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.Category_ID}>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{cat.Category_ID}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{cat.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
