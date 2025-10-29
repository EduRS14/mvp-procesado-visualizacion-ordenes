import React, { useState } from "react";
import ProductList from "./components/ProductList";
import CategoriesList from "./components/CategoriesList";
import OrdersList from "./components/OrdersList";
import LocationsList from "./components/LocationsList";
import "./App.css";

function App() {
  const [view, setView] = useState("productos");

  const renderView = () => {
    switch (view) {
      case "productos":
        return <ProductList />;
      case "categorias":
        return <CategoriesList />;
      case "ordenes":
        return <OrdersList />;
      case "ubicaciones":
        return <LocationsList />;
      default:
        return <ProductList />;
    }
  };

  return (
    <>
      <div className="container mb-4">
        <div className="btn-group mb-4">
          <button className="btn btn-outline-dark" onClick={() => setView("productos")} style={{ marginRight: "1rem" }}>Productos</button>
          <button className="btn btn-outline-dark btn-opcion" onClick={() => setView("categorias")}>Categorías</button>
          <button className="btn btn-outline-dark btn-opcion" onClick={() => setView("ordenes")}>Órdenes</button>
          <button className="btn btn-outline-dark btn-opcion" onClick={() => setView("ubicaciones")}>Ubicaciones</button>
        </div>
        {renderView()}
      </div>
    </>
  );
}

export default App;
