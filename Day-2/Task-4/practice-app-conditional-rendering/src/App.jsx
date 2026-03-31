import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TrafficLight from './components/TrafficLight'

function App() {
  return(
    <div>
      {/* Attempting conditional rendering depending on the color prop provided to the TrafficLight component */}
      <TrafficLight color="red" />
      {/* <TrafficLight color="yellow" /> */}
      <TrafficLight color="green" />
    </div>
  )
}

export default App
