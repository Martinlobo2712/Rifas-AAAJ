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
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: '500',
            border: '1px solid',
            borderColor: vendido ? '#f09595' : '#97c459',
            background: vendido ? '#fcebeb' : '#eaf3de',
            color: vendido ? '#791f1f' : '#27500a',
        }}>
            {numero}
        </div>
    )
}