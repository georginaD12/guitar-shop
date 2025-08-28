
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BrandsPage from './pages/BrandsPage';
import ModelsPage from './pages/ModelsPage';
import GuitarDetailsPage from './pages/GuitarDetailsPage';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandsPage />} />
        <Route path="/brands/:brandId/models" element={<ModelsPage />} />
        <Route path="/models/:brandId/:modelId" element={<GuitarDetailsPage />} />
      </Routes>
    </Router>
  );
}

