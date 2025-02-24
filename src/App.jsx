import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import './App.css'

import PlayerForm from './components/PlayerForm'
import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav'

function App() {

  return (
    <div>
      <AppNav/>
      <div>
        <AppRoutes />
      </div>
    </div>

  )
}

export default App
