
export function StatsBar({ numbers }) {
    const total = numbers.length
    const vendidos = numbers.filter(n => n.estado === 'vendido').length
    const disponibles = total - vendidos
    const porcentaje = total > 0 ? Math.round((vendidos / total) * 100) : 0

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '2rem'
        }}>
            <Tarjeta label="Total" valor={total} color="#1a1a1a" />
            <Tarjeta label="Disponibles" valor={disponibles} color="#2a7a4f" />
            <Tarjeta label="Vendidos" valor={vendidos} color="#c0392b" />
            <Tarjeta label="Vendido" valor={`${porcentaje}%`} color="#7a5c2a" />
        </div>
    )
}

function Tarjeta({ label, valor, color }) {
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e5e5e0',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '26px', fontWeight: '600', color }}>{valor}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{label}</div>
        </div>
    )
}