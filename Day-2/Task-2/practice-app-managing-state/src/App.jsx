import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Toggle from './hooks/Toggle'
import TextInput from './hooks/TextInput'

function App() {
  return(
    <div>
      <Toggle/>
      <TextInput/>
    </div>
  )
}

export default App
