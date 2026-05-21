export function Navbar({ logo }) {
    return (
        <nav style={{
            background: '#cc1818',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            </div>

            <a href="https://www.instagram.com/liga.aaaj/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '500',
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                @liga.aaaj
            </a>


        </nav>
    )
}