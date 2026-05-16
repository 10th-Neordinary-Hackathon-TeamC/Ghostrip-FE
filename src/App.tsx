<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import PhotoGeneratePage from "./pages/photo-generate";

function App() {
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import NotFoundPage from './pages/NotFound';
import SpotPage from './pages/spot-detail';

export default function App() {
>>>>>>> e8e7f9968bd48d939a8453ccae70db9307a7d263
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD

        <Route
          path="/photo-generate"
          element={<PhotoGeneratePage />}
        />
=======
        <Route path="/spots/:spotId" element={<SpotPage />} />
        <Route path="*" element={<NotFoundPage />} />
>>>>>>> e8e7f9968bd48d939a8453ccae70db9307a7d263
      </Routes>
    </BrowserRouter>
  );
}

export default App;