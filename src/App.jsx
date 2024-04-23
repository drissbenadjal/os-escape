import './App.scss'
import { useState } from 'react'
import Login from './Login'
import Desktop from './Desktop'
import { useEffect } from 'react'

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    //bloquer le clic droit
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
    //bloquer les touches F12 et Ctrl+Shift+I
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault()
      }
    })
  }, [])

  return (
    <>
        {
          IsLoggedIn ? <Desktop /> : <Login setIsLoggedIn={setIsLoggedIn} />
        }
    </>
  )
}

export default App
