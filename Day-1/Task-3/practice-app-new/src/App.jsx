import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import WelcomeFromComponents from './components/Welcome'

function HelloWorldComponent() {
  return <h1>Hello World from App.Jsx !</h1>
}

function App() {
  return (
    <>
      <HelloWorldComponent />
      <WelcomeFromComponents />
    </>
  )
}

export default App
