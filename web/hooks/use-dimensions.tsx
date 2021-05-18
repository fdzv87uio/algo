import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'

export default function useDimensions(): [
  (node: HTMLElement) => void,
  Dimensions
] {
  const [dimensions, setDimensions] = useState<Dimensions>(new Dimensions())
  const [node, setNode] = useState<HTMLElement>()
  const ref = useCallback((node: HTMLElement) => {
    setNode(node)
  }, [])

  useEffect(() => {
    if (node !== undefined) {
      let handle: number
      const measure = (node: HTMLElement) => {
        handle = window.requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect()
          setDimensions({
            width: rect.width,
            height: rect.height,
            dpr: window.devicePixelRatio || 1,
          })
        })
      }
      measure(node)

      const resizeListener = debounce(measure, 100)
      window.addEventListener('resize', resizeListener as any)

      return () => {
        window.removeEventListener('resize', resizeListener as any)
        window.cancelAnimationFrame(handle)
      }
    }
  }, [node])

  return [ref, dimensions]
}

export class Dimensions {
  width = 0
  height = 0
  dpr = 0
}
