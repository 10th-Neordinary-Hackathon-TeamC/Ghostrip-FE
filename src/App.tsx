import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import SpotPage from './pages/Spot'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spots/:spotId" element={<SpotPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
