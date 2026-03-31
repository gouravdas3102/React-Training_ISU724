import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Button from './components/Button'


// Importing the button component
function App() {
  return(
    <div> 
      {/* Rendering the button component by passing props with different label and color values */}
      <Button label="Click Me" color="blue" />
      <Button label="Submit" color="green" />
      <Button label="Cancel" color="red" />
    </div>
  )
}

export default App
