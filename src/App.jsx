import { useState } from 'react'
import { useSheetData } from './hooks/useSheetData'
import { StatsBar } from './components/StatsBar'
import { FilterBar } from './components/FilterBar'
import { NumberGrid } from './components/NumberGrid'
import { Navbar } from './components/Navbar'
import { RIFA_PRECIO } from './config.js'
import logo from './assets/escudoaaaj.svg'

export default function App() {
  const { numbers, loading, error, lastUpdated } = useSheetData()
  const [filtro, setFiltro] = useState('todos')

  return (
    <div>
      <Navbar logo={logo} />

      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem 0 1.5rem',
        backgroundColor: '#000000'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          letterSpacing: '-1px',
          color: '#ffffff',
          lineHeight: 1,
          marginBottom: '10px'
        }}>
          Rifas Sur-Centro 2026
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#888',
          fontWeight: '400'
        }}>
          Liga de Honor Oro Caballeros - nosecuantos números
        </p>
      </header>

      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0rem 1rem'
      }}>

        {loading && (
          <p style={{ textAlign: 'center', color: '#999', padding: '3rem 0' }}>
            Cargando números...
          </p>
        )}

        {error && (
          <div style={{
            background: '#fcebeb',
            border: '1px solid #f09595',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#791f1f',
            fontSize: '14px'
          }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* <StatsBar numbers={numbers} /> */}
            <div style={{
              textAlign: 'center',
              fontSize: 21,
              color: '#0401c7',
              textShadow: '1px 1px 1px #000000'
            }}>
              <p>{RIFA_PRECIO}</p>
            </div>
            <FilterBar filtroActivo={filtro} onChange={setFiltro} />
            <NumberGrid numbers={numbers} filtro={filtro} />
          </>
        )}

        {lastUpdated && (
          <p style={{ textAlign: 'center', color: '#bbb', fontSize: '12px', marginTop: '2rem' }}>
            Última actualización: {lastUpdated.toLocaleTimeString('es-AR')}
          </p>
        )}

      </div>
    </div>
  )
}