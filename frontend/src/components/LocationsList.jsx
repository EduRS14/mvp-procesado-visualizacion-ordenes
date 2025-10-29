import React, { useEffect, useState } from "react";

export default function LocationsList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Ubicaciones</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Código Postal</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Ciudad</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Estado</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>País</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Región</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(loc => (
            <tr key={loc.Postal_Code}>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{loc.Postal_Code}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{loc.City}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{loc.State}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{loc.Country}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{loc.Region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
