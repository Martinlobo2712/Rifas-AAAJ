export function PrizesTable({ prizes = [], loading }) {
    if (loading) {
        return (
            <p style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>
                Cargando prizes...
            </p>
        )
    }

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #cc1818' }}>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>#</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Premio</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>N° Ganador</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Ganador</th>
                </tr>
            </thead>
            <tbody>
                {prizes.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px', color: '#888' }}>{i + 1}</td>
                        <td style={{ padding: '8px', fontWeight: '500' }}>{p.premio}</td>
                        <td style={{ padding: '8px', color: p.ganador ? '#1a1a1a' : '#bbb' }}>
                            {p.ganador || 'A sortear'}
                        </td>
                        <td style={{ padding: '8px', color: p.comprador ? '#1a1a1a' : '#bbb' }}>
                            {p.comprador || 'A sortear'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}