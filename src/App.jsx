import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
     <div className="">
      <Board />
    </div>

    </>
  )
}

export default App
