const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: 'disponible', label: 'Disponibles' },
    { id: 'vendido', label: 'Vendidos' },
]

export function FilterBar({ filtroActivo, onChange, onShowPrizes, showingPrizes }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '8px', }}>
                {FILTROS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => { onChange(f.id); onShowPrizes(false) }}
                        style={{
                            padding: '6px 16px',
                            borderRadius: '0',
                            border: '1px solid #ce0f0f',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            background: !showingPrizes && filtroActivo === f.id ? '#ce0f0f' : '#fff',
                            color: !showingPrizes && filtroActivo === f.id ? '#fff' : '#ce0f0f',
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onShowPrizes(!showingPrizes)}
                style={{
                    padding: '6px 16px',
                    borderRadius: '0',
                    border: '1px solid #c0392b',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    background: showingPrizes ? '#c0392b' : '#fff',
                    color: showingPrizes ? '#fff' : '#c0392b',
                }}
            >
                Premios
            </button>

        </div>

    )
}