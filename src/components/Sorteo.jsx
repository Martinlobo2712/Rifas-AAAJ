import { useState, useEffect, useRef } from 'react'
import { useSorteo } from '../hooks/useSorteo'

const CAPITALIZAR = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export function Sorteo({ numbers, onVolver, prizes = [] }) {
    const { sorteando, resultado, error, disponibles, verificar, sortear, verificarPassword, obtenerGanadores } = useSorteo()
    const [verificando, setVerificando] = useState(false)

    const [paso, setPaso] = useState('password')  // password | ruleta | resultado
    const [password, setPassword] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [display, setDisplay] = useState('000')
    const intervalRef = useRef(null)
    const [ganadores, setGanadores] = useState([])
    const [fase, setFase] = useState('idle')

    const proximoPremio = prizes
        ?.find(p => !p.ganador || p.ganador.trim() === '')
        ?.premio || 'Sin premios disponibles'

    const [disponiblesNums, setDisponiblesNums] = useState(
        numbers.filter(n => n.estado === 'vendido').map(n => n.numero)
    )

    useEffect(() => {
        verificar()
        async function cargar() {
            const data = await obtenerGanadores()
            setGanadores(data)
        }
        cargar()
    }, [])

    async function handlePassword() {
        if (password.length !== 10) {
            setVerificando(true)
            setTimeout(() => {
                setVerificando(false)
                setErrorPass('Contraseña incorrecta.')
            }, 1500)
            return
        }
        setVerificando(true)
        const ok = await verificarPassword(password)
        setVerificando(false)
        if (!ok) {
            setErrorPass('Contraseña incorrecta.')
            return
        }
        setPaso('ruleta')
    }

    async function handleSortear() {
        if (disponiblesNums.length === 0 || fase !== 'idle') return
        setFase('girando')

        intervalRef.current = setInterval(() => {
            const random = disponiblesNums[Math.floor(Math.random() * disponiblesNums.length)]
            setDisplay(random)
        }, 50)

        const ganador = disponiblesNums[Math.floor(Math.random() * disponiblesNums.length)]

        setTimeout(async () => {
            clearInterval(intervalRef.current)
            setDisplay(ganador)
            setFase('guardando')

            const data = await sortear(ganador, password)
            if (data) {
                setDisponiblesNums(prev => prev.filter(n => n !== ganador))
                await verificar()
                setPaso('resultado')
                const actualizados = await obtenerGanadores()
                setGanadores(actualizados)
            }
            setFase('idle')
        }, 4000)
    }

    return (
        <div>
            <button className="btn-volver" onClick={onVolver}>
                ← Volver
            </button>

            {paso === 'password' && (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '1.5rem' }}>
                        Ingresá la contraseña para sortear
                    </p>
                    <input
                        type="password"
                        maxLength={14}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setErrorPass('') }}
                        onKeyDown={e => e.key === 'Enter' && handlePassword()}
                        placeholder=""
                        style={{
                            fontSize: '24px',
                            letterSpacing: '8px',
                            textAlign: 'center',
                            padding: '12px 24px',
                            border: '1px solid #cc1818',
                            outline: 'none',
                            width: '180px',
                            marginBottom: '1rem',
                            display: 'block',
                            margin: '0 auto 1rem',
                        }}
                    />
                    {errorPass && (
                        <p style={{ color: '#cc1818', fontSize: '13px', marginBottom: '1rem' }}>{errorPass}</p>
                    )}
                    <button
                        onClick={handlePassword}
                        disabled={verificando}
                        style={{
                            background: verificando ? '#aaa' : '#cc1818',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 32px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: verificando ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {verificando ? 'Verificando...' : 'Continuar →'}
                    </button>
                </div>
            )}

            {paso === 'ruleta' && (
                <div style={{ textAlign: 'center' }}>

                    {disponibles === 0 ? (
                        <p style={{ color: '#cc1818', fontWeight: '600' }}>No hay más premios disponibles.</p>
                    ) : (
                        <>
                            <p style={{ color: '#888', fontSize: '14px', marginBottom: '2rem' }}>
                                {disponibles} premio{disponibles !== 1 ? 's' : ''} disponible{disponibles !== 1 ? 's' : ''}
                            </p>
                            <p style={{ color: '#1a1a1a', fontSize: '15px', fontWeight: '600', marginBottom: '2rem' }}>
                                Próximo premio: <span style={{ color: '#cc1818' }}>{proximoPremio}</span>
                            </p>

                            {/* Tambor */}
                            <div style={{
                                fontSize: 'clamp(64px, 20vw, 120px)',
                                fontWeight: '750',
                                color: '#cc1818',
                                lineHeight: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #cc1818',
                                margin: '0 auto 2rem',
                                maxWidth: '320px',
                                background: sorteando ? '#fff8f8' : '#fff',
                                transition: 'background 0.2s',
                            }}>
                                {display}
                            </div>

                            <button
                                onClick={handleSortear}
                                disabled={fase !== 'idle'}
                                style={{
                                    background: fase !== 'idle' ? '#aaa' : '#cc1818',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '14px 48px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: fase !== 'idle' ? 'not-allowed' : 'pointer',
                                    letterSpacing: '1px',
                                }}
                            >
                                {fase === 'girando' ? 'Sorteando...' : fase === 'guardando' ? 'Buscando ganador...' : '¡SORTEAR!'}
                            </button>
                        </>
                    )}
                </div>
            )}

            {paso === 'resultado' && resultado && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '0.5rem' }}>Número ganador</p>
                    <div style={{
                        fontSize: 'clamp(64px, 20vw, 120px)',
                        fontWeight: '800',
                        color: '#cc1818',
                        lineHeight: 1,
                        marginBottom: '1.5rem',
                    }}>
                        {resultado.numero}
                    </div>

                    <div style={{
                        border: '1px solid #e5e5e0',
                        padding: '1.5rem',
                        maxWidth: '320px',
                        margin: '0 auto 2rem',
                        textAlign: 'left',
                    }}>
                        <Fila label="Premio: " valor={resultado.premio} />
                        <Fila label="Ganador: " valor={CAPITALIZAR(resultado.comprador) || 'Sin datos'} />
                    </div>

                    {error && (
                        <p style={{ color: '#cc1818', fontSize: '13px', marginBottom: '1rem' }}>{error}</p>
                    )}

                    <button
                        onClick={() => { setPaso('ruleta'); verificar() }}
                        style={{
                            background: '#cc1818',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 32px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Sortear siguiente →
                    </button>
                </div>
            )}

            {error && paso !== 'resultado' && (
                <p style={{ color: '#cc1818', fontSize: '13px', textAlign: 'center', marginTop: '1rem' }}>
                    {error}
                </p>
            )}

            {ganadores.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '1rem',
                        borderBottom: '1px solid #cc1818',
                        paddingBottom: '8px'
                    }}>
                        Ganadores sorteados
                    </h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #cc1818' }}>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>#</th>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Premio</th>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Número</th>
                                <th style={{ textAlign: 'left', padding: '8px', color: '#cc1818' }}>Ganador/a</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ganadores.map((g, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px', color: '#888' }}>{i + 1}</td>
                                    <td style={{ padding: '8px', fontWeight: '500' }}>{g.premio}</td>
                                    <td style={{ padding: '8px', fontWeight: '700', color: '#cc1818' }}>{g.numero}</td>
                                    <td style={{ padding: '8px' }}>{CAPITALIZAR(g.comprador) || 'Sin datos'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

function Fila({ label, valor }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '14px' }}>
            <span style={{ color: '#888' }}>{label}</span>
            <span style={{ fontWeight: '600' }}>{valor}</span>
        </div>
    )
}