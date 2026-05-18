const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: 'disponible', label: 'Disponibles' },
    { id: 'vendido', label: 'Vendidos' },
]

export function FilterBar({ filtroActivo, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            {FILTROS.map(f => (
                <button
                    key={f.id}
                    onClick={() => onChange(f.id)}
                    style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        border: '1px solid',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        borderColor: filtroActivo === f.id ? '#2a7a4f' : '#ccc',
                        background: filtroActivo === f.id ? '#2a7a4f' : '#fff',
                        color: filtroActivo === f.id ? '#fff' : '#555',
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    )
}