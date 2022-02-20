import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from '../routes/Home.js'
import Detail from '../routes/Detail.js'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  )
}

export default App
