import { useState } from 'react'
import restaurants from './restaurants'
import './App.css'

export default function App() {
  const [current, setCurrent] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const pick = () => {
    setSpinning(true)
    setCurrent(null)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * restaurants.length)
      setCurrent(restaurants[idx])
      setSpinning(false)
    }, 500)
  }

  return (
    <div className="app">
      <header>
        <h1>Restaurant Picker</h1>
        <p>Can't decide where to eat? Let fate decide.</p>
      </header>

      <button className="pick-btn" onClick={pick} disabled={spinning}>
        {spinning ? 'Picking...' : "Pick for me"}
      </button>

      {current && !spinning && (
        <div className="card">
          <div className="card-cuisine">{current.cuisine}</div>
          <h2 className="card-name">{current.name}</h2>
          <p className="card-address">{current.address}</p>
          {current.description && (
            <p className="card-description">{current.description}</p>
          )}
        </div>
      )}

      <section className="list">
        <h3>All options ({restaurants.length})</h3>
        <ul>
          {restaurants.map((r) => (
            <li key={r.id}>
              <span className="list-name">{r.name}</span>
              <span className="list-cuisine">{r.cuisine}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
