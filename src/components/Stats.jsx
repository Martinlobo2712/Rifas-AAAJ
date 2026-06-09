import { PRECIO_1, PRECIO_3 } from '../config'

export function Stats({ onVolver, onSorteo, numbers }) {

    const total = numbers.length
    const vendidos = numbers.filter(n => n.estado === 'vendido').length
    const faltan = total - vendidos

    const packs = Math.floor(vendidos / 3)
    const sueltos = vendidos % 3
    const recaudado = (packs * PRECIO_3) + (sueltos * PRECIO_1)

    const ranking = numbers
        .filter(n => n.estado === 'vendido' && n.vendedor)
        .reduce((acc, n) => {
            acc[n.vendedor] = (acc[n.vendedor] || 0) + 1
            return acc
        }, {})

    const rankingOrdenado = Object.entries(ranking)
        .sort((a, b) => b[1] - a[1])

    const formatPesos = n => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
    const capitalizar = str => str.charAt(0).toUpperCase() + str.slice(1)

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <button className="btn-volver" onClick={onVolver}>
                    ← Volver a las rifas
                </button>
                <button
                    className="btn-volver"
                    onClick={onSorteo}
                >
                    Ir al sorteo →
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
            }}>
                <Tarjeta label="Vendidas" valor={vendidos} color="#cc1818" />
                <Tarjeta label="Faltan vender" valor={faltan} color="#1a1a1a" />
                <Tarjeta label="Recaudado estimado" valor={formatPesos(recaudado)} color="#2a7a4f" />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '1rem',
                    borderBottom: '1px solid #cc1818',
                    paddingBottom: '8px'
                }}>
                    Ranking
                </h2>

                {rankingOrdenado.length === 0 ? (
                    <p style={{ color: '#999', fontSize: '14px' }}>Sin datos de vendedores todavía.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #cc1818' }}>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>#</th>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Vendedor</th>
                                <th style={{ textAlign: 'right', padding: '8px', color: '#cc1818' }}>Rifas vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingOrdenado.map(([nombre, cantidad], i) => (
                                <tr key={nombre} style={{
                                    borderBottom: '1px solid #eee',
                                    background: i === 0 ? '#fff8f8' : 'transparent'
                                }}>
                                    <td style={{ padding: '8px', color: i === 0 ? '#cc1818' : '#888', fontWeight: i === 0 ? '700' : '400' }}>
                                        {i === 0 ? '🥇' : i + 1}
                                    </td>
                                    <td style={{ padding: '8px', fontWeight: i === 0 ? '700' : '400' }}>{capitalizar(nombre)}</td>
                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: '600' }}>{cantidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

function Tarjeta({ label, valor, color }) {
    return (
        <div style={{
            border: '1px solid #e5e5e0',
            background: '#fff',
            padding: 'clamp(8px, 2vw, 24px) clamp(4px, 1vw, 16px)',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: 'clamp(20px, 5vw, 42px)', fontWeight: '700', color, lineHeight: 1 }}>{valor}</div>
            <div style={{ fontSize: 'clamp(10px, 2vw, 13px)', color: '#888', marginTop: '8px' }}>{label}</div>
        </div >
    )
}
