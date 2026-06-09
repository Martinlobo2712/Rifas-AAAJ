import { useState } from 'react'
import { SCRIPT_URL } from '../config'

export function useSorteo() {
    const [sorteando, setSorteando] = useState(false)
    const [resultado, setResultado] = useState(null)
    const [error, setError] = useState(null)
    const [disponibles, setDisponibles] = useState(null)

    async function verificar() {
        try {
            const res = await fetch(`${SCRIPT_URL}?accion=verificar`)
            const data = await res.json()
            setDisponibles(data.disponibles)
            return data.disponibles
        } catch (e) {
            setError('No se pudo verificar los premios.')
            return 0
        }
    }

    async function sortear(numero, password) {
        setSorteando(true)
        setError(null)
        try {
            const res = await fetch(`${SCRIPT_URL}?accion=sortear&numero=${numero}&password=${password}`)
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setResultado(data)
            return data
        } catch (e) {
            setError(e.message)
            return null
        } finally {
            setSorteando(false)
        }
    }

    async function verificarPassword(password) {
        try {
            const res = await fetch(`${SCRIPT_URL}?accion=verificarPassword&password=${password}`)
            const data = await res.json()
            return data.ok === true
        } catch (e) {
            setError('No se pudo verificar la contraseña.')
            return false
        }
    }

    async function obtenerGanadores() {
        try {
            const res = await fetch(`${SCRIPT_URL}?accion=ganadores`)
            const data = await res.json()
            return data.ganadores || []
        } catch (e) {
            return []
        }
    }

    return { sorteando, resultado, error, disponibles, verificar, sortear, verificarPassword, obtenerGanadores }
}