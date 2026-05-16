import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import HomePage from './pages/home';
  import PhotoGeneratePage from './pages/photo-generate';
  import SpotPage from './pages/spot-detail';
  import NotFoundPage from './pages/NotFound';

  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photo-generate" element={<PhotoGeneratePage />} />
          <Route path="/spots/:spotId" element={<SpotPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;