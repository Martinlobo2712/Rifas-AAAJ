import { useEffect, useRef } from 'react'

export function SponsorBanner({ logos }) {
    const containerRef = useRef(null)
    const posRef = useRef(0)
    const rafRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const speed = 0.5


        function animate() {
            posRef.current += speed // ← suma en vez de restar

            const lastChild = container.children[container.children.length - 1]
            if (!lastChild) return

            // Cuando el último elemento entró completamente por la derecha,
            // lo movemos al inicio
            if (posRef.current >= lastChild.offsetWidth) {
                posRef.current -= lastChild.offsetWidth + 48
                container.insertBefore(lastChild, container.firstChild)
            }

            container.style.transform = `translateX(${posRef.current}px)`
            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [logos])

    return (
        <div style={{
            background: 'rgba(0,0,0,0.75)',
            overflow: 'hidden',
            padding: '10px 0',
            width: '100%',
        }}>
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    gap: '48px',
                    alignItems: 'center',
                    width: 'max-content',
                    willChange: 'transform',
                }}
            >
                {[...logos, ...logos, ...logos].map((logo, i) => (
                    <img
                        key={i}
                        src={logo}
                        alt="Sponsor"
                        style={{
                            height: '50px',
                            width: '60px',
                            objectFit: 'contain',
                            borderRadius: '50%',
                            padding: '4px',
                            flexShrink: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}