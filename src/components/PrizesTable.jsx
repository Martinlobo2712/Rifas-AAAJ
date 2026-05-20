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
                <tr style={{ borderBottom: '1px solid #c0392b' }}>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#c0392b' }}>#</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#c0392b' }}>Premio</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#c0392b' }}>Ganador</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
    )
}