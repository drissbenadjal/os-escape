import './App.scss'
import { useState } from 'react'
import Login from './Login'
import Desktop from './Desktop'

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {
        IsLoggedIn ? <Desktop /> : <Login setIsLoggedIn={setIsLoggedIn} />
      }
    </>
  )
}

export default App
