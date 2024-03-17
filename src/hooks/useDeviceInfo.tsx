import { useEffect, useState } from "react"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function checkIsMobile(width: number) {
  return width < 641
}

export function useDeviceInfo() {
  const [windowSize, setWindowSize] = useState(getWindowDimensions())
  const [isMobile, setIsMobile] = useState(
    checkIsMobile(getWindowDimensions().width)
  )

  useEffect(() => {
    function handleResize() {
      const dimensions = getWindowDimensions()
      setWindowSize(dimensions)
      setIsMobile(checkIsMobile(dimensions.width))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    windowSize,
    isMobile,
  }
}
