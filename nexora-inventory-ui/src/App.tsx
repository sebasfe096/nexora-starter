import { useState } from 'react'
import './App.css'
import type {Product, ProductStatus} from "./models/product.ts";
import {useProducts} from "./hooks/useProducts.ts";

function App() {
  const { products, loading, error, refetch } = useProducts();
  const [filter, setFilter] = useState<ProductStatus | 'ALL'>('ALL');

  if (loading) return <div className="loading">Cargando productos...</div>;

  if (error) return (
      <div className="error-container">
        <div className="error">Error: {error}</div>
        <button onClick={refetch}>Reintentar conexión</button>
      </div>
  );

  const filtered = products.filter((p: Product) =>
      filter === 'ALL' ? true : p.status === filter
  );

  return (
      <div className="container">
        <h1>Nexora — Inventory Dashboard</h1>

        <div className="filters">
          {(['ALL', 'ACTIVE', 'INACTIVE', 'DISCONTINUED'] as const).map(s => (
              <button
                  key={s}
                  className={filter === s ? 'active' : ''}
                  onClick={() => setFilter(s)}
              >
                {s}
              </button>
          ))}
        </div>

        {filtered.length > 0 ? (
            <table className="products-table">
              <thead>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
              </thead>
              <tbody>
              {filtered.map((product: Product) => (
                  <tr key={product.id}>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                <span className={`badge badge-${product.status?.toLowerCase()}`}>
                  {product.status}
                </span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p className="empty">No hay productos con el filtro seleccionado.</p>
        )}
      </div>
  );
}

export default App;
