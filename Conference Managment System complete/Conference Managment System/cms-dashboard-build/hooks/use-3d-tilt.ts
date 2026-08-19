"use client"

import { useEffect, type RefObject } from "react"

export function use3DTilt(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const element = ref.current
        if (!element) return

        // Check setting (default to true)
        const isEnabled = localStorage.getItem("cms_3d_enabled") !== "false"
        if (!isEnabled) return

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth <= 900) return // Disable on mobile

            requestAnimationFrame(() => {
                // REDUCED INTENSITY: Divisor 100 for subtle effect
                const xAxis = (window.innerWidth / 2 - e.pageX) / 100
                const yAxis = (window.innerHeight / 2 - e.pageY) / 100

                if (element) {
                    element.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`
                }
            })
        }

        const handleMouseLeave = () => {
            if (element) {
                element.style.transform = "none"
            }
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseleave", handleMouseLeave)
            // Cleanup transform
            if (element) element.style.transform = "none"
        }
    }, [ref])
}
