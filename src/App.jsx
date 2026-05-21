import { useState } from 'react'
import { useSheetData } from './hooks/useSheetData'
import { StatsBar } from './components/StatsBar'
import { FilterBar } from './components/FilterBar'
import { NumberGrid } from './components/NumberGrid'
import { Navbar } from './components/Navbar'
import { RIFA_PRECIO } from './config.js'
import { useCountdown } from './hooks/useCountdown'
import { usePremios } from './hooks/usePremios'
import { PrizesTable } from './components/PrizesTable.jsx'
import { SponsorBanner } from './components/SponsorsBanner'
import logo from './assets/escudoaaaj.svg'

export default function App() {
  const { numbers, loading, error, lastUpdated } = useSheetData()
  const segundos = useCountdown(lastUpdated)
  const [filtro, setFiltro] = useState('todos')
  const { prizes, loading: loadingPrizes } = usePremios()
  const [showingPrizes, setShowingPrizes] = useState(false)
  const logoModules = import.meta.glob('./assets/logos/*', { eager: true })
  const sponsorLogos = Object.values(logoModules).map(m => m.default)

  return (
    <div style={{
      backgroundColor: "#fff6e9",
      marginBottom: "2rem"
    }}>
      <Navbar logo={logo} />
      <SponsorBanner logos={sponsorLogos} />

      <header style={{
        textAlign: 'center',
        padding: '2rem 0 1.5rem',
        backgroundColor: '#ebe3d4',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          letterSpacing: '-1px',
          color: '#000000',
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
          Liga de Honor Oro Caballeros - {numbers.length} números
        </p>
      </header>


      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0rem 1rem',
        marginTop: "1rem"
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
              paddingBottom: '0.5rem',
              color: '#ce0f0f',
              fontWeight: '700',
              textShadow: '1px 1px 1px #000000'
            }}>
              <p>{RIFA_PRECIO}</p>
              <p style={{ fontSize: '16px', color: '#464646', marginTop: '4px' }}>
                Pedí tu numero! →{' '}
                <a href="https://www.instagram.com/liga.aaaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#cc1818', fontWeight: '600', textDecoration: 'none' }}
                >
                  @liga.aaaj
                </a>
                {' '}←
              </p>
            </div>
            <div style={{
              border: '1px solid #000000',
              padding: '1.5rem'
            }}>
              <FilterBar filtroActivo={filtro} onChange={setFiltro} onShowPrizes={setShowingPrizes} showingPrizes={showingPrizes} />
              {showingPrizes ? (
                <PrizesTable prizes={prizes} loading={loadingPrizes} />
              ) : (
                <NumberGrid numbers={numbers} filtro={filtro} />
              )}
            </div>
          </>
        )}

        {lastUpdated && (
          <p style={{ textAlign: 'center', color: '#535353', fontSize: '12px', marginTop: '2rem' }}>
            Última actualización: {lastUpdated.toLocaleTimeString('es-AR', { hour12: false })}
            {' · '}
            Próxima actualización en {segundos}s
          </p>
        )}

      </div>
    </div >
  )
}