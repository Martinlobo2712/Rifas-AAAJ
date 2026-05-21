export function NumberGrid({ numbers, filtro }) {
    const visibles = filtro === 'todos'
        ? numbers
        : numbers.filter(n => n.estado === filtro)

    if (visibles.length === 0) {
        return (
            <p style={{ color: '#999', textAlign: 'center', padding: '3rem 0' }}>
                No hay números para mostrar.
            </p>
        )
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(30px, 1fr))',
            gap: '8px'
        }}>
            {visibles.map(n => (
                <Celda key={n.numero} numero={n.numero} estado={n.estado} />
            ))}
        </div>
    )
}

function Celda({ numero, estado }) {
    const vendido = estado === 'vendido'

    return (
        <div style={{
            padding: '6px 2px',
            borderRadius: '0',
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: '500',
            border: vendido ? '#ce0f0f' : '1px solid #1fce0f',
            background: vendido ? '#ce0f0f' : '#ffffff',
            color: vendido ? '#fff' : '#1b6d02',
        }}>
            {numero}
        </div>
    )
}