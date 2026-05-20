export function Navbar({ logo }) {
    return (
        <nav style={{
            background: '#cc1818',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            height: '64px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
            {logo && (
                <img
                    src={logo}
                    alt="Logo AAAJ Handball"
                    style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
                />
            )}
            <span style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: '20px',
                letterSpacing: '0.5px'
            }}>
                AAAJ Handball
            </span>
        </nav>
    )
}