import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Failure = () => {
    const location = useLocation();
useEffect(() => {
    console.log("🔴 FULL FAILURE URL:", location.pathname + location.search);
    const params = new URLSearchParams(location.search);
    for (const [key, value] of params.entries()) {
        console.log(`${key}: ${value}`);
    }
}, [location])

  return (
    <div>Failure</div>
  )
}

export default Failure