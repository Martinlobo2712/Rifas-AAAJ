import { useState, useEffect, useCallback } from 'react'
import { SHEET_URL, REFRESH_INTERVAL_MS } from '../config'

export function useSheetData() {
    const [numbers, setNumbers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(SHEET_URL)
            if (!response.ok) throw new Error('No se pudo acceder a la hoja.')

            const text = await response.text()
            const rows = text.trim().split('\n').map(row =>
                row.split(',').map(cell => cell.trim().replace(/"/g, ''))
            )

            const headers = rows[0].map(h => h.toLowerCase())

            const pares = []
            headers.forEach((h, i) => {
                if (h.includes('numero') || h.includes('número')) {
                    const compradorIdx = headers.findIndex(
                        (ch, ci) => ci > i && ch.includes('comprador')
                    )
                    if (compradorIdx !== -1) {
                        pares.push({ numIdx: i, compradorIdx })
                    }
                }
            })

            if (pares.length === 0) {
                throw new Error('No se encontraron pares "numero / comprador" en la hoja.')
            }

            const parsed = []

            rows.slice(1).forEach(row => {
                pares.forEach(({ numIdx, compradorIdx }) => {
                    const numero = row[numIdx]?.trim()
                    const comprador = row[compradorIdx]?.trim() ?? ''
                    console.log(comprador)

                    if (numero && numero !== '') {
                        parsed.push({
                            numero,
                            estado: comprador === '' ? 'disponible' : 'vendido'
                        })
                    }
                })
            })

            parsed.sort((a, b) => Number(a.numero) - Number(b.numero))

            if (parsed.length === 0) throw new Error('La hoja no tiene datos.')

            setNumbers(parsed)
            setLastUpdated(new Date())
            setError(null)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, REFRESH_INTERVAL_MS)
        return () => clearInterval(interval)
    }, [fetchData])

    return { numbers, loading, error, lastUpdated }
}