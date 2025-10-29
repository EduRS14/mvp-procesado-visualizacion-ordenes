import React, { useEffect, useState } from "react";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Órdenes</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>ID</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Cliente</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Fecha Orden</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Fecha Envío</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Total (USD)</th>
            <th style={{ paddingLeft: "10px", paddingRight: "10px" }}>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.Order_ID}>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{o.Order_ID}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{o.Customer_Name}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{new Date(o.Order_Date).toLocaleDateString()}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{new Date(o.Ship_Date).toLocaleDateString()}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{Number(o.total_sales).toFixed(2)}</td>
              <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>{o.total_items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
