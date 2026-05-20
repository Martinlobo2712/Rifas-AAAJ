import { useState, useEffect } from 'react'
import { REFRESH_INTERVAL_MS } from '../config'

export function useCountdown(lastUpdated) {
    const [segundosRestantes, setSegundosRestantes] = useState(REFRESH_INTERVAL_MS / 1000)

    useEffect(() => {
        setSegundosRestantes(REFRESH_INTERVAL_MS / 1000)

        const interval = setInterval(() => {
            setSegundosRestantes(s => {
                if (s <= 1) return REFRESH_INTERVAL_MS / 1000
                return s - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [lastUpdated])

    return segundosRestantes
}