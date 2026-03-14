import { useState, useEffect } from 'react'
import './App.css'
import type {Product} from "./models/product.ts";

// Sin interfaces tipadas para la respuesta de la API
// El fetch se hace directamente en el componente (deberia ser un custom hook)
// Usa 'any' para el tipo de los datos

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('ALL')

  // Logica de fetch directamente en el componente (sin custom hook)
  useEffect(() => {
    setLoading(true)
    // URL hardcodeada directamente en el componente
    fetch('http://localhost:8080/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos')
        return res.json()
      })
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = products.filter((p: Product) =>
    filter === 'ALL' ? true : p.status === filter
  )

  if (loading) return <div className="loading">Cargando productos...</div>
  if (error)   return <div className="error">Error: {error}</div>

  return (
    <div className="container">
      <h1>Nexora — Inventory Dashboard</h1>

      <div className="filters">
        {['ALL', 'ACTIVE', 'INACTIVE', 'DISCONTINUED'].map(s => (
          <button
            key={s}
            className={filter === s ? 'active' : ''}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

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

      {filtered.length === 0 && (
        <p className="empty">No hay productos con el filtro seleccionado.</p>
      )}
    </div>
  )
}

export default App
