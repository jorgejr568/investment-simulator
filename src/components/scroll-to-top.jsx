import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, search } = useLocation()
  const isInitialLoad = useRef(true)

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }

    const heading = document.querySelector('#main-content h1')
    heading?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search])

  return null
}
