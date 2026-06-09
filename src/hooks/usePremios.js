import { useState, useEffect } from 'react'
import { PRIZE_SHEET_URL } from '../config'

export function usePremios() {
    const [prizes, setPrizes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPrizes() {
            try {
                const response = await fetch(PRIZE_SHEET_URL)
                const text = await response.text()

                const rows = text.trim().split('\n').map(row =>
                    row.split(',').map(cell => cell.trim().replace(/"/g, ''))
                )

                const headers = rows[0].map(h => h.toLowerCase())
                const premioIdx = headers.findIndex(h => h.includes('premio'))
                const ganadorIdx = headers.findIndex(h => h.includes('ganador'))

                const parsed = rows.slice(1)
                    .filter(row => row[premioIdx]?.trim() !== '')
                    .map(row => ({
                        premio: row[premioIdx]?.trim(),
                        ganador: row[ganadorIdx]?.trim() || '',
                        comprador: row[ganadorIdx + 1]?.trim() || ''
                    }))

                setPrizes(parsed)
            } catch (e) {
                console.error('Error cargando Prizes:', e)
            } finally {
                setLoading(false)
            }
        }

        fetchPrizes()
    }, [])

    return { prizes, loading }
}