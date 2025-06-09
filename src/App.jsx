import { Route, Router, Routes } from 'react-router-dom'
import { Inicial } from './Components/Inicial'
import { Manuales } from './Components/Manuales'
import { Reporte } from './Components/Reporte'

function App() {

  return (
    <Routes>
      <Route path='/' element = {<Inicial />}></Route>
      <Route path='/Manuales' element = {<Manuales />}></Route>
      <Route path='/Reporte' element = {<Reporte />}></Route>
    </Routes>
  )
}

export default App
